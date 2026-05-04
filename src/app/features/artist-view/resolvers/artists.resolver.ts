import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';



export const artistResolver: ResolveFn<any> = (route, state) => {

  const aristId = route.paramMap.get('id')!;
  
  return true
};