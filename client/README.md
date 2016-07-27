
How to build
============

You need the SDK cross compilation for edison setup, see the [previous readme](https://github.com/hudovisk/client-server-iotivity/blob/master/README.md)

run `./compile-edison.sh` to build the executable `simple_client_edison`.

Both libraries are provided in the libs folder, but if you need to cross compile them here are the steps:

If you are running a old version of Ubuntu, chances are that you dont have a cmake 3.2+ in you repositories. So we need
to build that. Download the source [here](https://cmake.org/download/). Then in a new terminal window:
```
sudo apt-get install build-essential gcc g++
tar xf cmake-<version>.tar.gz
cd cmake-<version>/
./configure
make
sudo make install
```

Now we need to cross compile socket.io-client-cpp.
```
git clone --recurse-submodules https://github.com/socketio/socket.io-client-cpp.git
cd socket.io-client-cpp/
source /opt/poky-edison/<version>/environment-setup-core2-32-poky-linux
cmake -DBOOST_LIBRARYDIR=$SDKTARGETSYSROOT/usr/lib -DBOOST_INCLUDEDIR=$SDKTARGETSYSROOT/usr/include -DBoost_USE_STATIC_LIBS=OFF .
```
The easiest way I found to fix the missing boost_random error was to install the library in edison and copy it to your machine.
 - remove boost from your sdk.
 ```
 sudo rm -R $SDKTARGETSYSROOT/usr/include/boost
 sudo rm $SDKTARGETSYSROOT/usr/lib/libboost_*
 ```
 - make a directory to receive the library: `mkdir ~/edison-boost`
 - log in edison, update it package repo ([here](http://alextgalileo.altervista.org/edison-package-repo-configuration-instructions.html))
 - install boost: `opkg install boost-dev`.
 - copy from edison to your host
 ```
 scp -R /usr/include/boost <user>@<host-ip>:~/edison-boost
 scp /usr/lib/libboost_* <user>@<host-ip>:~/edison-boost
 ```
 
 - copy the library to your sdk
 ```
 cd ~/edison-boost
 sudo mv libboost_* $SDKTARGETSYSROOT/usr/lib
 sudo mv boost/ $SDKTARGETSYSROOT/usr/include/
 ```
 
 Now you should be able to cross compile socket.io-client-cpp.
 
 The last lib dependency for the client is curlcpp.
 ```
 cd ~
 git clone https://github.com/JosephP91/curlcpp.git
 cd curlcpp/build
 source /opt/poky-edison/1.6/environment-setup-core2-32-poky-linux
 cmake .. -DCURL_LIBRARY=$SDKTARGETSYSROOT/usr/lib/libcurl.so -DCURL_INCLUDE_DIR=$SDKTARGETSYSROOT/usr/include/curl/
 make
 ```
 The library should be in the `build/src` folder.
