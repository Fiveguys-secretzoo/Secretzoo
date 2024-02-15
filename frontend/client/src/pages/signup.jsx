import React from 'react';
import SignupForm from '../components/signup/signupForm';
import '../style/play.css'

const Signup = () => {
  return (
    <div>
      <div className="bg-signup-bg w-screen h-screen bg-cover z-[-10]">
        <div className="h-screen bg-custom-opacity">
          <SignupForm></SignupForm>
        </div>
      </div>
    </div>
  );
};

export default Signup;