
export function rcvdDiscoverResource(host) {
  return {
    type: 'RCVD_DISCOVER_RESOURCE',
    host
  };
}

export function rcvdDiscoverDevice(host) {
  return {
    type: 'RCVD_DISCOVER_DEVICE',
    host
  };
}

export function rcvdDiscoverPlatform(host) {
  return {
    type: 'RCVD_DISCOVER_PLATFORM',
    host
  };
}

export function rcvdGetResource(host) {
  return {
    type: 'RCVD_GET_RESOURCE',
    host
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