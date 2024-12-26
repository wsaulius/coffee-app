#!/bin/bash

npm update -g npm

npm install

ionic serve --external --disable-host-check --port=8080 --host=0.0.0.0
