#include<signal.h>
#include<string.h>
#include<pthread.h>
#include<unistd.h>
#include"ocstack.h" 
#include"ocpayload.h"
#include"payload_logging.h"
#include"server.h"

#define MAX_OBSERVERS 8

typedef struct
{
    OCObservationId observationId;
    int valid;
    OCResourceHandle resourceHandle;
} Observers;

Observers currentObservers[MAX_OBSERVERS];
static LEDResource LED;
int gQuitFlag = 0;
int underObservation = 0;

pthread_t threadId_observe;

OCRepPayload* getPayload(char* uri, int power, int state)
{
	OCRepPayload* payload = OCRepPayloadCreate();
	
	if(!payload) 
	{
		printf("Erro ao montar payload\n");
		return NULL;
	}
	
	printf("Montando o Payload\n");
	
	OCRepPayloadSetUri(payload, uri);
	OCRepPayloadSetPropInt(payload, "power", power);
	OCRepPayloadSetPropInt(payload, "state", state);
	return payload;
}


OCRepPayload* constructResponse(OCEntityHandlerRequest* ehRequest)
{
	return getPayload("/a/led", LED.power, LED.state);
	
}


OCEntityHandlerResult ProcessGetRequest(OCEntityHandlerRequest* ehRequest, OCRepPayload **payload)
{
	OCEntityHandlerResult ehResult;
	
	printf("Processando get\n");
	
	OCRepPayload *getResp = constructResponse(ehRequest);
	*payload = getResp;
	ehResult = OC_EH_OK;
	return ehResult;
}

OCEntityHandlerResult ProcessPutRequest(OCEntityHandlerRequest* ehRequest, OCRepPayload** payload)
{

	OCRepPayload *putPayload = (OCRepPayload*) ehRequest->payload;
	OCEntityHandlerResult ehResult;
	
	int64_t power;
	int64_t state;
	
	printf("Processando put\n");
	
	if(OCRepPayloadGetPropInt(putPayload, "power", &power))
	{
		LED.power = power;
	}
	
	if(OCRepPayloadGetPropInt(putPayload, "state", &state))
	{
		LED.state = state;
	}
	OIC_LOG_PAYLOAD(INFO, (OCPayload*)putPayload);
	
	OCRepPayload *getResp = constructResponse(ehRequest);
	*payload = getResp;
	ehResult = OC_EH_OK;
	return ehResult;
}

void processObserveRegister(OCEntityHandlerRequest *ehRequest)
{
	uint8_t i;
	
	for(i = 0; i<MAX_OBSERVERS; i++)
	{
		if(currentObservers[i].valid == 0)
		{
			currentObservers[i].observationId = ehRequest->obsInfo.obsId;
			currentObservers[i].valid = 1;
			underObservation = 1;
			break;
		}
	}
}

void processObserveDeregister(OCEntityHandlerRequest* ehRequest)
{
	uint8_t i;
	int stillObserving = 0;
	for(i = 0; i<MAX_OBSERVERS; i++)
	{
		if(currentObservers[i].observationId == ehRequest->obsInfo.obsId)
		{
			currentObservers[i].valid = 0;
		}
		
		if(currentObservers[i].valid == 1)
		{
			stillObserving = 1;
		}
	}
	
	if(stillObserving == 0)
	{
		underObservation = 0;
	}
}

OCEntityHandlerResult OCEntityHandlerCb(OCEntityHandlerFlag flag, OCEntityHandlerRequest *entityHandlerRequest, void* callbackpParam)
{

	OCEntityHandlerResult ehResult = OC_EH_ERROR;
    //OCEntityHandlerRequest *request = NULL;
    OCEntityHandlerResponse response;
    OCRepPayload* payload = NULL;
    
    response.numSendVendorSpecificHeaderOptions = 0;
    memset(response.sendVendorSpecificHeaderOptions, 0, sizeof response.sendVendorSpecificHeaderOptions);
    memset(response.resourceUri, 0, sizeof response.resourceUri);
    
    if(flag & OC_REQUEST_FLAG)
    {
    	if(OC_REST_GET == entityHandlerRequest->method)
    	{
    		ehResult = ProcessGetRequest(entityHandlerRequest, &payload);
 		   		
    	}
    	
    	if(OC_REST_PUT == entityHandlerRequest->method)
    	{
    		ehResult = ProcessPutRequest(entityHandlerRequest, &payload);
    	}
    	
    	if(ehResult != OC_EH_ERROR && ehResult != OC_EH_FORBIDDEN)
    	{
    		response.requestHandle = entityHandlerRequest->requestHandle;
    		response.resourceHandle = entityHandlerRequest->resource;
    		response.ehResult = ehResult;
    		response.payload = (OCPayload*)payload;
    		response.persistentBufferFlag = 0;
    			
   			if(OCDoResponse(&response) != OC_STACK_OK)
   			{
    			printf("Erro ao mandar\n");
   			}else
    		{
    			printf("Mandou resposta do get ou put\n");
    		}
   		}
    }
    
    if (flag & OC_OBSERVE_FLAG)
    {
        printf("Observe Flag\n");
        if (OC_OBSERVE_REGISTER == entityHandlerRequest->obsInfo.action)
        {
            printf("Received OC_OBSERVE_REGISTER from client\n");
            processObserveRegister(entityHandlerRequest);
        }
        else if (OC_OBSERVE_DEREGISTER == entityHandlerRequest->obsInfo.action)
        {
            printf("Received OC_OBSERVE_DEREGISTER from client\n");
            processObserveDeregister(entityHandlerRequest);
        }
    }
	return ehResult;
}

int createLEDResource(char* uri, LEDResource* ledResource, int resourceState, int resourcePower)
{
	ledResource->state = resourceState;
	ledResource->power = resourcePower;
	OCStackResult res = OCCreateResource(&(ledResource->handle), "core.led", OC_RSRVD_INTERFACE_DEFAULT, uri, OCEntityHandlerCb, NULL, OC_DISCOVERABLE|OC_OBSERVABLE);
	
	return res;	
}

void handlerSigInt(int signum)
{
	if(signum == SIGINT)
	{
		gQuitFlag = 1;
	}
}


void *ChangeLightRepresentation (void *param)
{
    (void)param;
    OCStackResult result = OC_STACK_ERROR;

    while (!gQuitFlag)
    {
        sleep(3);
        LED.power += 5;
        if (underObservation)
        {
            printf(" =====> Notifying stack of new power level %d\n", LED.power);
            // Notifying all observers
            result = OCNotifyAllObservers (LED.handle, OC_NA_QOS);
            if (OC_STACK_NO_OBSERVERS == result)
            {
            	underObservation = 0;
            }
       	}else
        {
           	printf("Incorrect notification type selected\n");
        }
    }
    return NULL;
}
	
int main() {

	if(OCInit1(OC_SERVER, OC_DEFAULT_FLAGS, OC_DEFAULT_FLAGS) != OC_STACK_OK) {	
		printf("Erro\n");
		return -1;
	}
	
	createLEDResource("/a/led", &LED, 0, 50);
	printf("LED criado\n");
	
	signal(SIGINT, handlerSigInt);
	
	pthread_create (&threadId_observe, NULL, ChangeLightRepresentation, (void *)NULL);
	
	
	printf("Rodando\n");
	while(!gQuitFlag) 
	{
		if(OCProcess() != OC_STACK_OK)
		{
			printf("Erro\n");
			return -1;
		}
	}
	
	if(OCStop() != OC_STACK_OK)
	{
		printf("Erro\n");
	}
	
	printf("Terminado\n");
	return 0;
}
