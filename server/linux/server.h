#ifndef SERVER_H
#define SERVER_H

typedef struct LEDResource
{
	OCResourceHandle handle;
	int power;
	int state;
}LEDResource;

int createLEDResource(char* uri, LEDResource* ledResource, int resourceState, int resourcePower);

void handlerSigInt(int signum);

OCRepPayload* getPayload(char* uri, int power, int state);

OCRepPayload* constructResponse(OCEntityHandlerRequest* ehRequest);

OCEntityHandlerResult ProcessGetRequest(OCEntityHandlerRequest* ehRequest, OCRepPayload **payload);

OCEntityHandlerResult ProcessPutRequest(OCEntityHandlerRequest* ehRequest, OCRepPayload** payload);

OCEntityHandlerResult OCEntityHandlerCb(OCEntityHandlerFlag flag, OCEntityHandlerRequest *entityHandlerRequest, void* callbackpParam);

#endif
