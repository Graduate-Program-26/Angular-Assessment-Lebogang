import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';



export const albumResolver: ResolveFn<any> = (route, state) => {

  const albumId = route.paramMap.get('id')!;
  
  return true
};