import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import Modal from '../components/Modal';

const Settings = (props) => {
    const nodes = (
        <Fragment>
            <h1>Settings</h1>

            <form>
                <input type="text" placeholder="E-mail" />
                <input type="password" placeholder="Password" />

                <label>Accept Terms & Conditions</label><input type="checkbox" />

                <button
                    onClick={(e) => {
                        e.preventDefault();

                        if (props.history.action !== 'POP') {
                            props.history.goBack();
                        } else {
                            props.history.push('/');
                        }
                    }}
                >
                    Back
                </button>
            </form>
        </Fragment>
    );    

    return ReactDOM.createPortal(<Modal>{nodes}</Modal>, document.getElementById('modal-root'));
};

export default Settings;