#!/bin/bash
set -eu
gcc -c array.c -o array.o
ar rcs libarray.a array.o
#gcc main.c -L. -larray
gcc tmp.c -L. -larray
./a.out
