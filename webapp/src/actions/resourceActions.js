
export function rcvdDiscoverResource(resource) {
  return {
    type: 'RCVD_DISCOVER_RESOURCE',
    resource
  };
}

export function rcvdDiscoverDevice(resource) {
  return {
    type: 'RCVD_DISCOVER_DEVICE',
    resource
  };
}

export function rcvdDiscoverPlatform(resource) {
  return {
    type: 'RCVD_DISCOVER_PLATFORM',
    resource
  };
}

export function rcvdGetResource(resource) {
  return {
    type: 'RCVD_GET_RESOURCE',
    resource
  };
}

export function discoverResources() {
  return {
    type: 'DISCOVER_RESOURCE',
    remote: true
  };
}

export function getResource(resourceId) {
  return {
    type: 'GET_RESOURCE',
    resourceId,
    remote: true
  };
}

export function observeResource(resourceId) {
  return {
    type: 'OBSERVE_RESOURCE',
    resourceId,
    remote: true
  };
}

export function rcvdObserveResource(resource) {
  return {
    type: 'RCVD_OBSERVE_RESOURCE',
    resource
  };
}

export function deobserveResource(resourceId) {
  return {
    type: 'DEOBSERVE_RESOURCE',
    resourceId,
    remote: true
  };
}

export function onAttrChangeAction(data) {
  console.log("onAttrChangeAction");
  console.log(data);
  return {
    type: 'PUT_RESOURCE',
    resourceId: data.resourceId,
    attr: data.attr,
    remote: true
  };
}