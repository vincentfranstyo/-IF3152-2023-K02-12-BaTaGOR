import MockHome from "../mockPage/mockHome"
import {getByText, render, screen} from '@testing-library/react'
import "@testing-library/jest-dom"
import "jest-fetch-mock"

describe('Home', () => {

    // user api test
    it('returns the status code 200 (success)', async () => {
      const response = await fetch("http://localhost:3000/api/user");
      expect(response.status).toBe(200);
    });

    // logged in user test
    it("should say Welcome, Kean", () => {
      const { getByText } = render(
        <MockHome userState={true} username={"Kean"}/>
      );
  
      expect(getByText("Welcome, Kean")).toBeInTheDocument()
    });

    // logged out user test
    it("should say Welcome to BaTaGOR", () => {
      const { getByText } = render(
        <MockHome userState={false} username={"Kean"}/>
      );
  
      expect(getByText("Welcome to BaTaGOR")).toBeInTheDocument()
    });

  })