import { Map, List, fromJS } from 'immutable';

function getResourceIndexById(resources, resourceId) {
  return resources.findIndex(fresource => {
    if(!fresource) return false;
    return fresource.get('id') === resourceId;
  });
}

function getResourceById(resources, resourceId) {
  var fresource = {};

  resources.forEach(resource => {
    if(resource.get('id') === resourceId) {
      console.log("found resource monitor");
      fresource = resource;
      return false;
    }
    return true;
  });

  return fresource;
}

function getAttrIndexByName(attrs, name) {
  return attrs.findIndex(attr => {
    if(!attr) return false;
    return attr.get('name') === name;
  });
}

function rcvDiscoverResource(state, action) {
  return state.update(
    'resources', 
    resources => {
      const index = getResourceIndexById(resources, action.resource.id);
      if(index === -1) {
        return resources.push(fromJS(action.resource));
      } else {
        return resources.update(index, () => fromJS(action.resource));  
      }
  });
}

function rcvGetResource(state, action) {
  return state.update('resources',
    resources => {
      const index = getResourceIndexById(resources, action.resource.id);
      
      if(index == -1){
        return resources;
      } else {
        return resources.update(index, () => fromJS(action.resource));
      }
  });
}

function putResource(state, action) {
  console.log("putResource");
  return state.update('resources', 
    resources => {
      const index = getResourceIndexById(resources, action.resourceId);
      if(index == -1){
        return resources;
      } else {
        return resources.update(index, (resource) => {
          return resource.update('attrs', (attrs) => {
            const index = getAttrIndexByName(attrs, action.attr.name);
            if(index == -1){
              return attrs;
            } else {
              console.log("Update attr");
              console.log(action.attr);
              return attrs.update(index, () => fromJS(action.attr));
            }
          });
        });
      }
  });
}

function rcvObserveResource(state, action) {
  return state.update(
    'monitoredResources',
    monitoredResources => {
      const index = getResourceIndexById(monitoredResources, action.resource.id);

      if(index === -1) return monitoredResources;

      return monitoredResources.update(index, (resource) => {
        action.resource.attrs.forEach(attr => {
          const index = resource.get('lineData').findIndex(fline => {
            if(!fline) return false;
            return fline.get('name') === attr.name;
          });
          console.log(index);
          resource = resource.update('lineData', lineData => {
            console.log(lineData.toJS());
            return lineData.update(index, data => {
              console.log(data.toJS());
              return data.update('values', values => {
                console.log(values.toJS());
                return values.push(fromJS({x: values.size, y: attr.value}));
              });
            })
          });
        });
        return resource;
      });
  });
}

export default function(
  state = fromJS({
    resources: [],
    monitoredResources: []
  }),
  action
) {
  switch(action.type) {
    case 'RCVD_DISCOVER_RESOURCE':
      return rcvDiscoverResource(state, action);
    case 'RCVD_GET_RESOURCE':
      return rcvGetResource(state, action);
    case 'GET_RESOURCE':
      return state;
    case 'PUT_RESOURCE':
      return putResource(state, action);
    case 'OBSERVE_RESOURCE':
      return state.update(
        'monitoredResources',
        monitoredResources => {
          const index = getResourceIndexById(monitoredResources, action.resourceId);
          if(index === -1) {
            const resource = getResourceById(state.get('resources'), action.resourceId);
            console.log(resource.toJS());
            var lineData = [];
            resource.get('attrs').toJS().forEach(attr => {
              lineData[lineData.length] = {
                name: attr.name,
                values: [{x: 0, y: attr.value}],
                strokeWidth: 3,
                strokeDashArray: "5,5"
              };
            });
            console.log(resource.set('lineData', fromJS(lineData)).toJS());
            return monitoredResources.push(resource.set('lineData', fromJS(lineData)));
          } else {
            return monitoredResources;
          }
      });
    case 'RCVD_OBSERVE_RESOURCE':
      return rcvObserveResource(rcvGetResource(state, action), action);
    default:
      return state;
  }

}