import Navbar from "../mockComponent/mockNavbar"
import {getByText, render, screen} from '@testing-library/react'
import "@testing-library/jest-dom"
import "jest-fetch-mock"

describe('Home', () => {

    // logged in user test
    it("should have a History button", () => {
      const { getByText } = render(
        <Navbar userState={true}/>
      );
      const firstButton=screen.getByTestId("checkButton")
      expect(firstButton).toHaveTextContent("History")
    });

     // logged out user test
     it("should have a History button", () => {
        const { getByText } = render(
          <Navbar userState={false}/>
        );
        const firstButton=screen.getByTestId("checkButton")
        expect(firstButton).toHaveTextContent("Sign In")
      });

  })