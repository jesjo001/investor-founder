import React,{useState} from "react";
import "./faq.css";
import faqArrow from "../../assets/images/faqArrow.svg";

export const Faq = ({data}) => {
  return (
    <div className="muon-faq">
      <h2 className="faq-header">Got any questions?</h2>
      <section className="mx-auto d-flex flex-column align-items-center">
            {
                data?.length > 0 && data.map((faq, i)=>{
                    return(
                        <div className="w-100 d-flex justify-content-center" key={`${faq.title}${i}`}>
                            <EachFaq faq={faq}/>
                        </div>
                    )
                })
            }
      </section>
    </div>
  );
};


const EachFaq =({faq})=>{

    const [open, setOpen] = useState(false);

    const {title, desc} = faq;

    return(
        <div className="muon-faq-section">
            <section className="muon-faq-title d-flex align-items-center justify-content-between" style={{borderRadius: open?"": "8px"}} onClick={()=>setOpen(!open)}>
                <p>{title}</p>
                <img src={faqArrow} alt="arrow" className={`${open? "faq-open": "faq-close"}`} />
            </section>
            <section className={`muon-faq-desc ${open? "desc-open": "desc-close"}`}>
                <p>{desc}</p>
            </section>
        </div>
    )
}

