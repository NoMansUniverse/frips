import ReactPaginate from 'react-paginate';
import styled from 'styled-components';


const MyPaginate = styled(ReactPaginate).attrs({
    // You can redifine classes here, if you want.
    activeClassName: "active", // default to "disabled"
  })`
    margin: 0;
    display: flex;
    padding: 0;
    flex-wrap: wrap;
    list-style: none;
    justify-content:center;
    align-items: center;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    li a {
      height: 40px;
      padding: 0 10px;
      font-size: 0.9375rem;
      min-width: 40px;
      border-radius: 20px;
      border: 1px solid rgba(0, 0, 0, 0.23);
  
      color: rgba(0, 0, 0, 0.87);
      margin: 0 3px;
      box-sizing: border-box;
      text-align: center;
      font-family: "Helvetica", "Arial", sans-serif;
      font-weight: 400;
      line-height: 1.43;
      cursor: pointer;
      display: inline-flex;
      outline: 0;
      position: relative;
      align-items: center;
      user-select: none;
      vertical-align: middle;
      justify-content: center;
      text-decoration: none;
      background-color: transparent;
      -webkit-tap-highlight-color: transparent;
    }
    li.previous a,
    li.next a,
    li.break a {
      border-color: transparent;
    }
    li.active a {
      background-color: rgba(130, 160, 194, 0.3);
      border-color: 1px solid rgba(130, 160, 194, 0.5);
      color: #82a0c2;
    }
    li.disabled a {
      color: grey;
    }
    li.disable,
    li.disabled a {
      cursor: default;
    }
  `;


export default MyPaginate