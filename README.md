How to build
============

All the code that run in edison is cross-compiled in an ubuntu machine (or VM).

Be aware that in order to complete all the steps you will need at least 50GB of **free space** in or machine.

First download the yocto-image from [intel web-site](https://downloadmirror.intel.com/24271/eng/edison-src-weekly-68.tgz)

Then follow [these steps](https://downloadmirror.intel.com/24271/eng/edison-src-weekly-68.tgz) to build the image and the sdk:
- Install required packages:
```
sudo apt-get install build-essential git diffstat gawk chrpath texinfo libtool gcc-multilib
sudo apt-get install libboost-dev libboost-program-options-dev libexpat1-dev libqt4-core libqt4-gui
sudo apt-get install dfu-util screen
```

- Extract the image:
```
tar xvf edison-src-weekly-68.tgz
```

- Initialize Yocto build environment:
```
cd edison-src
./device-software/setup.sh --bb_number_thread=X --parallel_make=X 
```
If you run into random build failures, adjust the number of threads to limit the amount of parallelism used when building.
For example: `–bb_number_thread=2 –parallel_make=2` is a safe option for a quad-core machine with 4GB of RAM.
```
source poky/oe-init-build-env
bitbake edison-image
```
It will take a few hours (or even a day). If you can’t build all packages successfully, you need to rerun this until it says success.

- Add "meta-oic" to build-machine
```
cd edison-src/device-software
git clone http://git.yoctoproject.org/git/meta-oic
cd meta-oic
git checkout
```

- Add "meta-oic" layer to the build with editing "bblayer.conf"

Add the full path of `meta-oic` in section `[BBLAYERS ?= “ \]` see image [here](https://wiki.iotivity.org/_detail/bblayers-conf.png?id=running_sample_codes_in_iotivity_0.9_sdk_on_edison).

- Add iotivity package to the build with editing local.conf

Add one line `IMAGE_INSTALL_append = ” iotivity-dev“` like below image. Make sure to keep a space between the opening quote and “iotivity-dev” else you will run into an error with bitbake complaining there is no provider of clloaderiotivity 

- Build toolchain
```
source poky/oe-init-build-env
bitbake edison-image -c populate_sdk  
```

- Setup SDK
```
./edison-src/build/tmp/deploy/sdk/poky-edison-eglibc-x86_64-edison-image-core2-32-toolchain-1.6.sh
```

- Copy necessary files to toFlash folder
```
./edison-src/device-software/utils/flash/postBuild.sh
```

- Connect Edison and your development system with 2 USB cables.

There are two options to flash the edison board:
 1. Intel Edison Installer (easier).

Go to the [download section of the intel edison board](https://software.intel.com/en-us/iot/hardware/edison/downloads) and download the correct installer for your OS. After running the installer, follow all the steps and in Options sections,
click the Flash firmaware button. Select the local image option and find the file `edison-image-edison.hddimg` inside the toFlash folder created earlier.

 2. flashall command line

Execute below command
```
sudo ./edison-src/build/toFlash/flashall.sh
```

Checking the flash process
```
sudo screen /dev/ttyUSB0 115200
```

Boot up and Configure Edison

run this command in the edison terminal
```
configure_edison --setup
```

It is also a good idea to have edison configured to boot from a larger SD Card.
In order to do that follow [these steps](https://communities.intel.com/thread/61048).
