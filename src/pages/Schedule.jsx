import React from 'react'
import styled from "styled-components";

export default function Schedule() {
  return (
    <SchedulePage>
        <Header/>
        <Program>
            <Sidebar>
                <Logo>
                    <h1>Playmood</h1>
                    <p>TV</p>
                </Logo>
                <Navigation>
                    <Home>
                        Home
                    </Home>
                    <Tv>
                        TV Guide
                    </Tv>
                </Navigation>

            </Sidebar>
            <Mainbar>
                <table>
                    <thead>
                        <th>Early</th>
                        <th>Late</th>
                        <th>Medium</th>
                        <th>Hard</th>
                    </thead>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </table>

            </Mainbar>

        </Program>

    </SchedulePage>
  )
}

const SchedulePage = styled.div`
    width: 100vw;
    height: 100vh;
`
const Program = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
`
const Sidebar = styled.div`
    width: 25%;
    background-color: grey;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 30px;
`
const Mainbar = styled.div`
    width: 75%;
    height: 100%;
    background-color: black;
    padding-top: 100px;
    table{
        width: 100%;
        height: 100%;
        border: 2px solid white;
        tr{
            border: 2px solid white;
            height: 80px;
        }
        thead{
            border: 2px solid white;
            height: 150px;
        }
        td{
            border: 2px solid white;
        }
        th{
            border: 2px solid white;
        }
        
    }
`
const Logo = styled.div`   
    height: fit-content;
    width: 100%;
    margin-top: 120px;
    display: flex;
    justify-content: center;
    h1{
        font-size: 3rem;
        color: red; 
    }
    p{
        color: white;
        font-size: 1.5rem;
    }
`
const Navigation = styled.div`
    height: fit-content; 
    width: 100%;
    display: flex;
    flex-direction: column;
`
const Home = styled.div`
    padding: 20px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    &:hover{
        background-color: white;
        color: red;
    }
`
const Tv = styled.div`
    padding: 20px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    &:hover{
        background-color: white;
        color: red;
    }
`