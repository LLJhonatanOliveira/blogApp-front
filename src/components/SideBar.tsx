import styled from "styled-components"

export default function SideBar(){
    return(
        <ContainerSideBar>
            <Border></Border>
            <div>
            <div>Categories</div>
            <div>Tags</div>
            </div>
        </ContainerSideBar>
    )
}

const ContainerSideBar = styled.div`
    display: flex;
    margin-top: 8vh;
    div{
        margin-bottom: 30vh;
    }
`
const Border = styled.div`
    height: 70vh;
    width: 3px;
    border-style: solid;
    background-color: black;
    margin-right: 25px;
`