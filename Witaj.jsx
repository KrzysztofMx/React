import React, { Component } from "react";
import Odliczanie from "./Odliczanie";
//import "./Witaj.css";
import EdycjaLekcji from "./Edycja";
import uniqid from "uniqid";

class Powitanie extends Component {
  constructor() {
    super();
    this.state = {
      czas: {
        godzina: new Date().getHours(),
        minuta: new Date().getMinutes(),
        sekunda: new Date().getSeconds(),
      },
      Lekcje: [],
      edytowaneLekcje: {
        id: uniqid(),
        name: "",
        czasG: -1,
        czasM: -1,
      },
    };
    this.dodanieLekcji = this.dodanieLekcji.bind(this);
    this.zapisanieLekcji = this.zapisanieLekcji.bind(this);
    this.usuwanieLekcji = this.usuwanieLekcji.bind(this);
    this.edycjaLekcjiE = this.edycjaLekcjiE.bind(this);
    this.czyscEdycje = this.czyscEdycje.bind(this);
    this.odswiezanie = this.odswiezanie.bind(this);
  }

  odswiezanie() {
    this.setState({
      czas: {
        godzina: new Date().getHours(),
        minuta: new Date().getMinutes(),
        sekunda: new Date().getSeconds(),
      },
    });
  }

  componentDidMount() {
    const listaLekcji = JSON.parse(localStorage.getItem("Lekcje")) || [];
    this.setState({ Lekcje: listaLekcji });
    setInterval(this.odswiezanie, 1000);
  }
  dodanieLekcji(val) {
    this.setState((prevState) => {
      return {
        edytowaneLekcje: Object.assign(prevState.edytowaneLekcje, val),
      };
    });
  }
  zapisanieLekcji() {
    this.setState(
      (prevState) => {
        const czyLekcjaJuzIstnieje = prevState.Lekcje.find(
          (element) => element.id === prevState.edytowaneLekcje.id
        );
        let aktualizowanieLekcji;
        if (czyLekcjaJuzIstnieje) {
          aktualizowanieLekcji = prevState.Lekcje.map((element) => {
            if (element.id === prevState.edytowaneLekcje.id) {
              return prevState.edytowaneLekcje;
            } else {
              return element;
            }
          });
        } else {
          aktualizowanieLekcji = [
            ...prevState.Lekcje,
            prevState.edytowaneLekcje,
          ];
        }
        return {
          Lekcje: aktualizowanieLekcji,
          edytowaneLekcje: {
            id: uniqid(),
            name: "",
            czasG: -1,
            czasM: -1,
          },
        };
      },
      () => localStorage.setItem("Lekcje", JSON.stringify(this.state.Lekcje))
    );
  }
  usuwanieLekcji(id) {
    this.setState(
      (prevState) => ({
        Lekcje: prevState.Lekcje.filter((element) => element.id !== id),
      }),
      () => localStorage.setItem("Lekcje", JSON.stringify(this.state.Lekcje))
    );
  }
  edycjaLekcjiE(id) {
    this.setState((prevState) => ({
      edytowaneLekcje: {
        ...prevState.Lekcje.find((element) => element.id === id),
      },
    }));
  }

  czyscEdycje() {
    this.setState({
      edytowaneLekcje: {
        id: uniqid(),
        name: "",
        czasG: -1,
        czasM: -1,
      },
    });
  }

  render() {
    const Lekcje = this.state.Lekcje.map((element) => {
      return (
        <Odliczanie
          key={element.id}
          id={element.id}
          name={element.name}
          czasG={element.czasG}
          czasM={element.czasM}
          obecnyCzas={this.state.czas}
          Usun={(id) => this.usuwanieLekcji(id)}
          edytujLekcje={(id) => this.edycjaLekcjiE(id)}
        />
      );
    });
    return (
      <div className="EdycjaLekcji">
        {Lekcje}
        <EdycjaLekcji
          name={this.state.edytowaneLekcje.name}
          czasG={this.state.edytowaneLekcje.czasG}
          czasM={this.state.edytowaneLekcje.czasM}
          onInputChange={(val) => this.dodanieLekcji(val)}
          onSave={() => this.zapisanieLekcji()}
          czyszczenieEdycji={() => this.czyscEdycje()}
        />
      </div>
    );
  }
}

export default Powitanie;
