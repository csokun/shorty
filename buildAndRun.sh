#!/bin/bash
docker build -t shorty .
docker run --rm -p 3001:3001 shorty