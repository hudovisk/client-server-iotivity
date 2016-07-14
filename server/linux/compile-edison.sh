
source /opt/poky-edison/1.6/environment-setup-core2-32-poky-linux 

$CC server.c -std=c99 -g2 -DTB_LOG -Wall -pthread \
-DNDEBUG -DWITH_POSIX -D__linux__ -DIP_ADAPTER -DNO_EDR_ADAPTER -DLE_ADAPTER -DROUTING_EP -DWITH_BWT -DGLIB_VERSION_MIN_REQUIRED=GLIB_VERSION_2_32 -DWITH_TCP \
-I $IOTIVITY_HOME/resource/c_common/oic_string/include \
-I $IOTIVITY_HOME/resource/csdk/stack/include/ \
-I $IOTIVITY_HOME/resource/c_common/ \
-I $IOTIVITY_HOME/resource/csdk/logger/include/ \
-I $IOTIVITY_HOME/extlibs/tinycbor/tinycbor/src/ \
-I $IOTIVITY_HOME/extlibs/cjson \
-I $IOTIVITY_HOME/resource/oc_logger/include \
-I $IOTIVITY_HOME/resource/csdk/connectivity/lib/libcoap-4.1.1 \
-L $IOTIVITY_HOME/out/yocto/i586/debug/ \
-Wl,-rpath $IOTIVITY_HOME/out/yocto/i586/debug/ \
-lm -loc -loc_logger -loctbstack -locsrm -lconnectivity_abstraction -lcoap -lpthread -llogger -lrt -o server_edison \
&& \
$CC server_thermo.c -std=c99 -g2 -DTB_LOG -Wall -pthread \
-DWITH_POSIX -D__linux__ -DIP_ADAPTER -DNO_EDR_ADAPTER -DLE_ADAPTER -DROUTING_EP -DWITH_BWT -DGLIB_VERSION_MIN_REQUIRED=GLIB_VERSION_2_32 -DWITH_TCP \
-I $IOTIVITY_HOME/resource/c_common/oic_string/include \
-I $IOTIVITY_HOME/resource/csdk/stack/include/ \
-I $IOTIVITY_HOME/resource/c_common/ \
-I $IOTIVITY_HOME/resource/csdk/logger/include/ \
-I $IOTIVITY_HOME/extlibs/tinycbor/tinycbor/src/ \
-I $IOTIVITY_HOME/extlibs/cjson \
-I $IOTIVITY_HOME/resource/oc_logger/include \
-I $IOTIVITY_HOME/resource/csdk/connectivity/lib/libcoap-4.1.1 \
-L $IOTIVITY_HOME/out/yocto/i586/debug/ \
-Wl,-rpath $IOTIVITY_HOME/out/yocto/i586/debug/ \
-lm -loc -loc_logger -loctbstack -locsrm -lconnectivity_abstraction -lcoap -lpthread -llogger -lrt -o server_thermo_edison

