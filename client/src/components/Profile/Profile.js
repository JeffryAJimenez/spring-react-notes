import Modal from "../UI/Modal";
import EditIcon from "./EditIcon";
import Button from "../UI/Button";
import LogoutIcon from "./LogoutIcon";
import classes from "./Profile.module.css";
import OrderList from "../Orders/OrderList";
import LeftIcon from "./LeftIcon";
import RightIcon from "./RightIcon";



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

            <div className={classes.actions}>
                <button className={classes["button--alt"]} onClick={props.onClose}>Close</button>
            </div>
    
    {/* </div> */}
    </Modal>

}

export default Profile;