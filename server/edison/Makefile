#Set the two variables below for the client build.
CLIENTARCH=x86
BUILDTYPE=release
##

YOCTOCXXFLAGS=-I$(SDKTARGETSYSROOT)/usr/include/iotivity/resource/ -I$(SDKTARGETSYSROOT)/usr/include/iotivity/resource/stack -I$(SDKTARGETSYSROOT)/usr/include/iotivity/resource/ocrandom -I$(SDKTARGETSYSROOT)/usr/include/iotivity/resource/logger -I$(SDKTARGETSYSROOT)/usr/include/iotivity/resource/oc_logger

YOCTOLDFLAGS=-loc -loctbstack -loc_logger -lmraa

default: server

observer.o: observer.cpp
	$(CXX) -std=c++0x -c -o $@ $< $(YOCTOCXXFLAGS)

server.o: server.cpp
ifeq ($(SDKTARGETSYSROOT),)
	echo "Error: Yocto cross-toolchain environment not initialized"
	exit 1
endif
	$(CXX) -std=c++0x -c -o $@ $< $(YOCTOCXXFLAGS)

server: server.o observer.o
	$(CXX) -o server server.o observer.o $(YOCTOLDFLAGS)

clean:
	rm -rf server *.o
