import React from 'react'
import { useParams } from "react-router-dom";
import ActorHeader from '../../components/Actor/ActorHeader/ActorHeader'
import ActorBiography from '../../components/Actor/ActorBiography/ActorBiography';
import ActorKnowFor from '../../components/Actor/ActorKnownFor/ActorKnowFor';
import Footer from '../../components/Footer/Footer';
import './ActorDetailPage.css'
const ActorDetailPage = () => {
  const { actorId } = useParams(); // lấy id từ URL
  return (
  <>
   <div className="actor-detail-page">
      {/* Cột trái */}
      <div className="actor-left">
        <ActorHeader actorId={actorId} />
      </div>

      {/* Cột phải */}
      <div className="actor-right">
       
        <ActorBiography actorId={actorId}/>
        <ActorKnowFor actorId={actorId}/>
        {/* 📌 Tạm placeholder, sau này bạn sẽ thêm các component khác như:
            - ActorBio
            - KnownFor
            - ActorCredits
        */}
      </div>
    </div>
    <Footer />

  </>
  )
}

export default ActorDetailPage