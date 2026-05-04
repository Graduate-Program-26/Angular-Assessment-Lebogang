import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';



export const playlistResolver: ResolveFn<any> = (route, state) => {
  const playlistId = route.paramMap.get('id')!;
  
  return true;
};