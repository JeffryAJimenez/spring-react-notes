import Modal from "../UI/Modal";
import EditIcon from "./EditIcon";
import Button from "../UI/Button";
import LogoutIcon from "./LogoutIcon";
import classes from "./Profile.module.css";
import OrderList from "../Orders/OrderList";
import LeftIcon from "./LeftIcon";
import RightIcon from "./RightIcon";


const EggIcon = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-egg" viewBox="0 0 16 16">
    <path d="M8 15a5 5 0 0 1-5-5c0-1.956.69-4.286 1.742-6.12.524-.913 1.112-1.658 1.704-2.164C7.044 1.206 7.572 1 8 1c.428 0 .956.206 1.554.716.592.506 1.18 1.251 1.704 2.164C12.31 5.714 13 8.044 13 10a5 5 0 0 1-5 5zm0 1a6 6 0 0 0 6-6c0-4.314-3-10-6-10S2 5.686 2 10a6 6 0 0 0 6 6z"/>
    </svg>
}

const Profile = (props) => {


    return <Modal onClose={props.onClose} >
       {/* <div class="container mt-5 d-flex justify-content-center"> */}

            

            <div className={classes.body}>

                <div className={classes.image}>
                    <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80" class="rounded" width="155" />
                </div>

                <div className={classes['body-left']}>
                    
                    <h4 className={classes.name}>Alex HMorrision</h4>
                    <span>AlexHMorrison@email.com</span>

                    <div className={classes.stats}>

                        <div className={classes['stats-item']}>

                            <span className={classes['stats-item-title']}>Orders</span>
                            <span>38</span>
                            
                        </div>



                        <div className={classes['stats-item']}>

                            <span className={classes['stats-item-title']}>Total</span>
                            <span >$200,2220</span>
                            
                        </div>
                        
                    </div>


                    <div className={classes.buttons}>

                        <Button name="log out"> 
                            <LogoutIcon />
                        </Button>
                        
                        <Button name="edit profile">
                            <EditIcon />
                        </Button>
                    </div>


                </div>


                
            </div>
            
            <OrderList />

            <div className={classes['buttons-next']}>

                <Button >
                    <LeftIcon />
                </Button>

                <Button >
                    <RightIcon />
                </Button>

            </div>
   
    
    {/* </div> */}
    </Modal>

}

export default Profile;