import { Map, List, fromJS } from 'immutable';

function getHostIndexByAddr(hosts, addr) {
  return hosts.findIndex(fhost => {
    if(!fhost) return false;
    return fhost.get('addr') === addr;
  });
}

function updateResourceInHost(host, resource) {
  const resources = host.get('resources');
  const index = resources.findIndex(fres => {
    if(!fres) return false;
    return fres.get('id') === resource.id;
  });

  return host.set('resources',
    resources.update(index, (res) => {
      return res.set('attrs', fromJS(resource.attrs));
    })
  );
}

function getResourceIndexById(resources, resourceId) {
  return resources.findIndex(fresource => {
    if(!fresource) return false;
    return fresource.get('id') === resourceId;
  });
}

function getResourceFromHostsById(hosts, resourceId) {
  var fresource = {};
  hosts.forEach(host => {
    host.get('resources').forEach(resource => {
      if(resource.get('id') === resourceId) {
        console.log("found resource monitor");
        fresource = resource;
        return false;
      }
      return true;
    });
    return true;
  });

  return fresource;
}

export default function(
  state = fromJS({
    hosts: [],
    monitoredResources: []
  }),
  action
) {
  switch(action.type) {
    case 'RCVD_DISCOVER_RESOURCE':
      return state.update(
        'hosts', 
        hosts => {
          const index = getHostIndexByAddr(hosts, action.host.addr);
          if(index === -1) {
            return hosts.push(fromJS({
              addr: action.host.addr,
              resources: [action.host.resource]
            }));
          } else {
            return hosts.update(index, (host) => {
              return host.update('resources', (res) => res.push(fromJS(action.host.resource)));
            });  
          }
        });
    case 'RCVD_GET_RESOURCE':
      return state.update('hosts',
              hosts => {
                const index = getHostIndexByAddr(hosts, action.host.addr);
                
                if(index < 0) return hosts;

                return hosts.update(index, (host) => {
                  return updateResourceInHost(host, action.host.resource);
                });
              });
    case 'GET_RESOURCE':
      return state;
    case 'OBSERVE_RESOURCE':
      return state.update(
        'monitoredResources',
        monitoredResources => {
          const index = getResourceIndexById(monitoredResources, action.resourceId);
          if(index === -1) {
            const resource = getResourceFromHostsById(state.get('hosts'), action.resourceId);
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
    default:
      return state;
  }

}