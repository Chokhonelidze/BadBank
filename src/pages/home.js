import {Card} from "./context";
import bank from "../images/bank.png"
function Home(){

    return (
        <Card 
        textcolor = 'black'
        bgcolor ='primary'
        header = 'WELCOME TO THE BANK'
        text="for all your banking needs"
        body={(<img src={bank} className="img-fluid" alt="Responsive image"/>)}
        />
    );
}
export default Home;