g++ simple_client.cpp -std=c++0x -g2 -DTB_LOG -Wall -pthread \
-DNDEBUG -DWITH_POSIX -D__linux__ -DIP_ADAPTER -DNO_EDR_ADAPTER -DLE_ADAPTER -DROUTING_EP -DWITH_BWT -DGLIB_VERSION_MIN_REQUIRED=GLIB_VERSION_2_32 -DWITH_TCP \
-I $IOTIVITY_HOME/resource/c_common/oic_string/include \
-I $IOTIVITY_HOME/resource/csdk/stack/include/ \
-I $IOTIVITY_HOME/resource/c_common/ \
-I $IOTIVITY_HOME/resource/csdk/logger/include/ \
-I $IOTIVITY_HOME/extlibs/tinycbor/tinycbor/src/ \
-I $IOTIVITY_HOME/extlibs/cjson \
-I $IOTIVITY_HOME/resource/oc_logger/include \
-I $IOTIVITY_HOME/resource/csdk/connectivity/lib/libcoap-4.1.1 \
-I $SOCKETIO_HOME/src \
-L $SOCKETIO_HOME/ \
-L $IOTIVITY_HOME/out/linux/x86_64/debug/ \
-Wl,-rpath $IOTIVITY_HOME/out/linux/x86_64/debug/ \
-lsioclient -lboost_system \
-lm -loc -loc_logger -loctbstack -locsrm -lconnectivity_abstraction -lcoap -lpthread -llogger -lrt -o simple_client
