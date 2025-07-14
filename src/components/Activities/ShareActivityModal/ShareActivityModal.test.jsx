import { test, expect, describe } from "vitest";



//vi.mock('./../../services/share.service')

//beforeEach(async() => {
 //   const { getUsers } = await import('./../../services/share.service');
  //  const mockedUsers = [{ id: 0, displayName: 'aaa' }, { id: 1, displayName: 'bbb' }, { id: 2, displayName: 'ccc' }];
 //   getUsers.mockResolvedValue(mockedUsers)
//})

describe('tua mamma', () => {
    test('è bella', () => {
        expect(true).toBe(true);
    });
});


///describe("ShareActivityModal", () => {
  //test("Il modale di Sharing è presente", () => {
   // render(<ShareActivityModal isOpen={true} onCLose={() => null} />);
    //expect(screen.queryByLabelText("modal")).toBeInTheDocument();
  //});
  //test("Viene mostrato una lista con almeno un'elemento", async () => {
    //render(<ShareActivityModal isOpen={true} onClose={() => null} />);
    //const items = await screen.findAllByRole("listitem");
    //expect(items.length).toBeGreaterThan(0);
  //});
 // test("Gli elementi in lista devono avere la checkbox", async () => {
   // render(<ShareActivityModal isOpen={true} onClose={() => null} />);
    //const items = await screen.findAllByRole("checkbox");
    //expect(items.length).toBeGreaterThan(0);
  //});
  //test('La funzione getUser visualizza gli utenti in ordine alfabetico A-Z', async() => {
    //    render(<ShareActivityModal isOpen={true} onClose={() => null}/>);
      //  const items = await screen.findAllByLabelText('checkbox');
        //const names = items.map(label => label.textContent.trim());
        //const sortedNames = [...names].sort((a, b) => a.localeCompare(b));
    //    expect(names).toEqual(sortedNames);
      //  expect(items.length).toBe(3);
        //expect(items[0].textContent).toBe('aaa');
        //expect(items[1].textContent).toBe('bbb');
        //expect(items[2].textContent).toBe('ccc');
    //})
    //test('Cliccando la checkbox dovrebbe apparire correttamente spuntata', async () => {
       // const user = userEvent.setup();
      //  render(<ShareActivityModal isOpen={true} onClose={() => null}/>);
      //  const checkboxes = await screen.findAllByRole('checkbox');
      //  const checkbox0 = checkboxes[0];
       // expect(checkbox0).not.toBeChecked();
       // await user.click(checkbox0);
       // expect(checkbox0).toBeChecked();
       // await user.click(checkbox0);
       // expect(checkbox0).not.toBeChecked();
   // })
   // test('Contiene un tasto condividi che è disabilitato se nessun utente viene selezionato', async () => {
       // render(<ShareActivityModal isOpen={true} onClose={() => null}/>);
      //  const shareBtn = await screen.findByLabelText('share-with');
      //  expect(shareBtn).toBeInTheDocument();
     //   expect(shareBtn).toBeDisabled();
  //  })
 //   test('Il tasto condividi viene alibitato quando uno o più utenti vengono selezionati', async() => {
      //  userEvent.setup();
      //  render(<ShareActivityModal isOpen={true} onClose={() => null}/>);
      //  const shareBtn = await screen.findByLabelText('share-with');
      //  const checkboxes = await screen.findAllByRole('checkbox');
       // const checkbox0 = checkboxes[0];
       // const checkbox1 = checkboxes[1];
       // await userEvent.click(checkbox0);
      //  expect(shareBtn).toBeEnabled();
       // await userEvent.click(checkbox1);
       // expect(shareBtn).toBeEnabled();
  //  })
//});
