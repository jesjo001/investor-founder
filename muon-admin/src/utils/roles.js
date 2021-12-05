import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

export const isSuperAdmin = () => {
  if (localStorage.token) {
    const decoded = jwt_decode(localStorage.token);
    const { role } = decoded.data;

    const SUPER_ADMIN = process.env.REACT_APP_SUPER_ADMIN_ROLE;

    if (SUPER_ADMIN) {
      const superAdmin = role === SUPER_ADMIN;
      return superAdmin;
    } else {
      console.log('SUPER ADMIN HAS NOT BEEN SET');
      return null;
    }
  }
};
