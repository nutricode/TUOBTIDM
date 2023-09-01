import "./Modal.css";

const ModalAbout = ({ setModalOpen}) => {
  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="body-text">
          <h4 style={{ textAlign: 'center' }}>UNIVERSITATEA "OVIDIUS" DIN CONSTANŢA FACULTATEA DE MATEMATICĂ ȘI INFORMATICĂ</h4>
          <br />
          <br />
          <br />
          <br />
              <h2 style={{ textAlign: 'center' }}>THE USE OF BLOCKCHAIN TECHNOLOGY IN DOCUMENT MANAGEMENT</h2>
              <br />
              <br /><br />
          <br />
          <br />
          <br />
          <br />
            <h4 style={{ textAlign: 'left' }}>COORDONATOR ŞTIINŢIFIC</h4>
            <h4 style={{ textAlign: 'left' }}>Conf. Univ. Dr. PUCHIANU CRENGUȚA-MĂDĂLINA</h4>
            <br />
          <br />
          <br />
                <h4 style={{ textAlign: 'right' }}>ABSOLVENT</h4>
                <h4 style={{ textAlign: 'right' }}>ALEXEI PAUL</h4>
                <h5 style={{ textAlign: 'right' }}>paul.allexei@gmail.com</h5>
                <br />
          <br />
          <br />
                <h4 style={{ textAlign: 'center' }}>2023</h4>
                
          </div>

          <div className="footer">
            <button className="button button-red"
              onClick={() => {
                setModalOpen(false);
              }}
              id="cancelBtn"
              style = {{ marginBottom: "-5px"}}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default ModalAbout;
