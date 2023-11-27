import mockIncome from "../mockComponent/mockIncome"
import {getByText, render, screen} from '@testing-library/react'
import "@testing-library/jest-dom"
import "jest-fetch-mock"
import IncomeTable from "../mockComponent/mockIncome"

describe('Home', () => {

    // logged in user test
    it("should have a rendered table", () => {
      const { getByText } = render(
        <IncomeTable userState={true} field_id={1} field_id2={2} field_id3={3} 
        field_income={1000000} field_income2={150000} field_income3={500000}
        field_name="GOR Gura" field_name2="GOR Engan" field_name3="GOR Illa" />
      );
      const firstTable = screen.getByTestId("testTable")
      expect(firstTable).toHaveTextContent("GOR Gura")
    });

  })