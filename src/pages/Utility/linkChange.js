import React from 'react'
import { useNavigate } from 'react-router-dom'

function removeLastLink(url, newString) {
  const lastSlashIndex = url.lastIndexOf('/');
  if (lastSlashIndex === -1) {
    return url;
  }

  const updatedURL = url.substring(0, lastSlashIndex) + '/' + newString;
  return updatedURL;
}


const changeSingLink = (linkStr) => {
  const navigate = useNavigate();
  const currentURL = window.location.href;
  const newURL = removeLastLink(currentURL, linkStr);
  navigate(newURL);
}

export  {changeSingLink}