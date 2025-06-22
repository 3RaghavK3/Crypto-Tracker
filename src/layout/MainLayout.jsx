import { Header } from "../components/Header";

export function MainLayout({children}){
    return(
        <>
        <div style={{
            display:"flex",
            flexDirection:"column",
            minHeight:"100vh",
            backgroundColor:"black"
        }}>

        <Header/>
        {children}
       
        </div>
        </>
    )
}