import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { MockedLoadingProvider } from "../../../__mocks__/LoadingProviderMock";
import { Login } from "./index";

describe("<Login />", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("mostra os campos de validação quando as entradas estão vazias e o botão é clicado", async () => {
    const { findByTestId, findByText } = render(<Login />);

    const button = await findByTestId("Login.Button");
    fireEvent.click(button);

    const emailValidationMessage = await findByText("O e-mail é obrigatório");
    expect(emailValidationMessage).toBeInTheDocument();

    const passwordValidationMessage = await findByText("A senha é obrigatória");
    expect(passwordValidationMessage).toBeInTheDocument();
  });

  it("chama a função login e checa o fluxo ao preencher o formulário corretamente e clicar no botão", async () => {
    const showLoadingMock = jest.fn();
    const hideLoadingMock = jest.fn();
    const mockedNavigate = jest.fn();

    const { findByTestId } = render(
      <MockedLoadingProvider
        showLoading={showLoadingMock}
        hideLoading={hideLoadingMock}
      >
        <Login />
      </MockedLoadingProvider>
    );

    const emailInput = await findByTestId("Email.Input");
    fireEvent.change(emailInput, { target: { value: "demo@livros.io" } });

    const passwordInput = await findByTestId("Password.Input");
    fireEvent.change(passwordInput, { target: { value: "sadasd213" } });

    await act(async () => {
      const button = await findByTestId("Login.Button");
      fireEvent.click(button);
    });

    await waitFor(() => {
      expect(showLoadingMock).toHaveBeenCalled();
      expect(hideLoadingMock).toHaveBeenCalled();
      expect(mockedNavigate).toHaveBeenCalled();
      expect(mockedNavigate).toHaveBeenCalledWith("Dashboard");
    });
  });
});
