
source /opt/poky-edison/1.6/environment-setup-core2-32-poky-linux 

$CXX simple_client.cpp -std=c++0x -g2 -DTB_LOG -Wall -pthread \
-DNDEBUG -DWITH_POSIX -D__linux__ -DIP_ADAPTER -DNO_EDR_ADAPTER -DLE_ADAPTER -DROUTING_EP -DWITH_BWT -DGLIB_VERSION_MIN_REQUIRED=GLIB_VERSION_2_32 -DWITH_TCP \
-I $SDKTARGETSYSROOT/usr/include/iotivity/resource \
-I $SDKTARGETSYSROOT/usr/include/iotivity/resource/stack \
-I $SDKTARGETSYSROOT/usr/include/iotivity/resource/oc_logger \
-I libs/socketio/src \
-I libs/curlcpp/include \
-L libs/curlcpp \
-L $SDKTARGETSYSROOT/usr/lib \
-Wl,-rpath $SDKTARGETSYSROOT/usr/lib \
-lsioclient -lcurl -lcurlcpp -lboost_system \
-lm -loc -loc_logger -loctbstack -locsrm -lconnectivity_abstraction -lcoap -lpthread -lrt -o simple_client_edison
