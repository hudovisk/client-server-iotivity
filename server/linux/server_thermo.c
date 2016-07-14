#include<signal.h>
#include<string.h>
#include"ocstack.h" 
#include"ocpayload.h"
#include"payload_logging.h"

typedef struct thermoResource
{
	OCResourceHandle handle;
	int temperature;
}thermoResource;

static thermoResource thermo;
int gQuitFlag = 0;


OCRepPayload* getPayload(char* uri, int temperature)
{
	OCRepPayload* payload = OCRepPayloadCreate();
	
	if(!payload) 
	{
		printf("Erro ao montar payload\n");
		return NULL;
	}
	
	printf("Montando o Payload\n");
	
	OCRepPayloadSetUri(payload, uri);
	OCRepPayloadSetPropInt(payload, "temperature", temperature);
	return payload;
}

OCRepPayload* constructResponse(OCEntityHandlerRequest* ehRequest)
{
	return getPayload("/a/thermo", thermo.temperature);
	
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
	
	int64_t temperature;
	
	printf("Processando put\n");
	
	if(OCRepPayloadGetPropInt(putPayload, "temperature", &temperature))
	{
		thermo.temperature = temperature;
	}
	
	OIC_LOG_PAYLOAD(INFO, (OCPayload*)putPayload);
	
	OCRepPayload *getResp = constructResponse(ehRequest);
	*payload = getResp;
	ehResult = OC_EH_OK;
	return ehResult;
}

OCEntityHandlerResult OCEntityHandlerCb(OCEntityHandlerFlag flag, OCEntityHandlerRequest *entityHandlerRequest, void* callbackpParam)
{
	OCEntityHandlerResult ehResult = OC_EH_ERROR;
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
	return ehResult;
}

int createThermoResource(char* uri, thermoResource* thermoResource, int resourceTemp)
{
	thermoResource->temperature = resourceTemp;
	OCStackResult res = OCCreateResource(&(thermoResource->handle), "core.thermo", OC_RSRVD_INTERFACE_DEFAULT, uri, OCEntityHandlerCb, NULL, OC_DISCOVERABLE|OC_OBSERVABLE);
	
	return res;
}

void handlerSigInt(int signum)
{
	if(signum == SIGINT)
	{
		gQuitFlag = 1;
	}
}

int main()
{
	if(OCInit1(OC_SERVER, OC_DEFAULT_FLAGS, OC_DEFAULT_FLAGS) != OC_STACK_OK) {	
		printf("Erro\n");
		return -1;
	}
	
	createThermoResource("/a/thermo", &thermo, 20);
	printf("Thermostat created\n");
	
	signal(SIGINT, handlerSigInt);
	
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
