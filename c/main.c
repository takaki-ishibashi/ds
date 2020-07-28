#include <stdio.h>
#include "array.h"
#include "array-stack.h"

int main(void) {
  //void *ar;
  //ar = init_ar(3, sizeof(int));
  //printf("current length is %d\n", len_ar());
  init_as(10, sizeof(int));
  set_as(3, 1);
  set_as(1, 2);
  printf("get a value that index is 1: %d\n", get_as(1)); // expect 2
  add_as(3);
  
  return 0;
}
#include "array-stack.h"
#include <stdio.h>

int main(void) {
  void *ar;
  ar = init_ar();
  init_as(&ar, sizeof(int));
  set_as(3, 10);
  get_as(3);
  add_as(8);
  rm_as(1);
  printf("%d\n", len_ar()); // expect: 1
  return 0;
}
