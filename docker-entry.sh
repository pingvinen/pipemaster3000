#!/bin/bash

cd /app/api
yarn start &

cd /app/ui
yarn serve
