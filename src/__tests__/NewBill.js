/**
 * @jest-environment jsdom
 */

import { fireEvent, screen, waitFor } from "@testing-library/dom";
import userEvent from '@testing-library/user-event';
import NewBillUI from "../views/NewBillUI.js";
import NewBill from "../containers/NewBill.js";
import {localStorageMock} from "../__mocks__/localStorage.js";
import { ROUTES, ROUTES_PATH} from "../constants/routes.js";
import mockStore from "../__mocks__/store.js";
import router from "../app/Router.js";


describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    test("Then mail icon in vertical layout should be highlighted", async () => {
      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee'
      }))
      const root = document.createElement("div")
      root.setAttribute("id", "root")
      document.body.append(root)
      router()
      window.onNavigate(ROUTES_PATH.NewBill)
      await waitFor(() => screen.getByTestId('icon-mail'))
      const mailIcon = screen.getByTestId('icon-mail')
      expect(mailIcon).toBeTruthy();
    })
    test("Then a form should load", () => {
      const html = NewBillUI()
      document.body.innerHTML = html
      expect(screen.getByTestId('expense-type')).toBeTruthy
      expect(screen.getByTestId('expense-name')).toBeTruthy
      expect(screen.getByTestId('datepicker')).toBeTruthy
      expect(screen.getByTestId('amount')).toBeTruthy
      expect(screen.getByTestId('vat')).toBeTruthy
      expect(screen.getByTestId('pct')).toBeTruthy
      expect(screen.getByTestId('commentary')).toBeTruthy
      expect(screen.getByTestId('file')).toBeTruthy
    })
  })

  describe('When I am on NewBill Page and I click the file input', () => {
    test('Then I should be able to change the file', () => {
      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Admin'
      }))
      document.body.innerHTML = NewBillUI()

      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname })
      }
      
      const newBill = new NewBill({
        document, onNavigate, store: mockStore, localStorage: window.localStorage
      })

      const fileFixture = new File(
        [""], "facturefreemobile.jpg", { type: "image/jpg"}
      );

      let fileInputFilesGet = jest.fn();
      let fileInputValueGet = jest.fn().mockReturnValue(fileFixture.name);
      let fileInputValueSet = jest.fn().mockImplementation(value => {
        fileInputValue = value;
      })  

      const file = screen.getByTestId('file')
      Object.defineProperty(file, 'files', {
        get: fileInputFilesGet
      })  
      Object.defineProperty(file, 'value', {
        get: fileInputValueGet,
        set: fileInputValueSet
      });

      const handleChangeFile = jest.fn((e) => newBill.handleChangeFile)
      file.addEventListener('change', handleChangeFile)
      let fileInputValue = 'facturefreemobile.jpg';
      fileInputFilesGet.mockReturnValue([fileFixture]);
      fireEvent.change(file)
      expect(handleChangeFile).toHaveBeenCalled();
    })
  })

  
  describe("When I submit a new bill", () => {
    test("send new bill to mock API POST", async () => {
      localStorage.setItem("user", JSON.stringify({ type: "Employee", email: "e@e" }));
      const root = document.createElement("div")
      root.setAttribute("id", "root")
      document.body.append(root)
      router()

      const store = null
      const newBill = new NewBill({
        document, onNavigate, store, localStorage: window.localStorage
      })
      window.onNavigate(ROUTES_PATH.Bills)

      const handleSubmit = jest.fn((e) => newBill.handleSubmit)
      const submitBtn = screen.getByTestId('submit');
      submitBtn.addEventListener('click', handleSubmit);
      fireEvent.click(submitBtn)
      expect(handleSubmit).toHaveBeenCalled();
    })
    describe("When an error occurs on API", () => {
      beforeEach(() => {
        jest.spyOn(mockStore, "bills")
        Object.defineProperty(
            window,
            'localStorage',
            { value: localStorageMock }
        )
        window.localStorage.setItem('user', JSON.stringify({
          type: 'Employee',
          email: "e@e"
        }))
        const root = document.createElement("div")
        root.setAttribute("id", "root")
        document.body.appendChild(root)
        router()
      })
      test("send bills to an API and fails with 404 message error", async () => {

        mockStore.bills.mockImplementationOnce(() => {
          return {
            list : () =>  {
              return Promise.reject(new Error("Erreur 404"))
            }
          }})
        window.onNavigate(ROUTES_PATH.Bills)
        await new Promise(process.nextTick);
        const message = await screen.getByText("Erreur")
        expect(message).toBeTruthy()
      })

      test("send messages to an API and fails with 500 message error", async () => {

        mockStore.bills.mockImplementationOnce(() => {
          return {
            list : () =>  {
              return Promise.reject(new Error("Erreur 500"))
            }
          }})

        window.onNavigate(ROUTES_PATH.Bills)
        await new Promise(process.nextTick);
        const message = await screen.getByText("Erreur")
        expect(message).toBeTruthy()
      })
    })
  })
})