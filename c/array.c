#include <stdlib.h>
#include "array.h"
static void *arr;
static int length;
void init_ar(size_t elem_size) {
  arr = malloc(elem_size);
  length = 1;
}
int len_ar() {
  return length;
}
void set_ar(int i, void* elem_val) {
  arr[i] = *elem_val;
}
void* get_ar(int i) {
  return &arr[i];
}


