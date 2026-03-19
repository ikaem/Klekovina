#!/bin/sh
export HOST=0.0.0.0
export PORT=${PORT:-3000}
node build
