import { useEffect, useState } from "react";
import {
  Author,
  Card,
  Container,
  SubTitle,
  Thumb,
  ThumbIconDown,
  ThumbIconUp,
  Title,
} from "./Main.styles";
import axios from "axios";

const MotivatorCards = () => {
  const [motivators, setMotivators] = useState([]);

  useEffect(() => {
    const getMotivators = async () => {
      const res = await axios.get(
        "http://127.0.0.1:4000/api/v1/motivators/place/main",
        {
          headers: { "x-foo": "bar" },
        }
      );
      console.log(res);

      setMotivators(res.data);
    };

    getMotivators();
  }, []);

  if (!motivators.length) {
    return <h1 className="text-3xl font-bold text-center">Loading...</h1>;
  }

  return (
    <Container>
      {motivators.map((motivator: any) => (
        <Card key={motivator.id}>
          <div className="flex justify-between w-full mb-4 ">
            <Author>author: {motivator.author.login}</Author>
            <div className="flex">
              <Thumb>
                <ThumbIconUp />
                {motivator.like.length}
              </Thumb>
              <Thumb>
                <ThumbIconDown />
                {motivator.dislike.length}
              </Thumb>
            </div>
          </div>
          <div className="flex justify-center w-full mb-2">
            <img
              src={motivator.photo}
              alt="image"
              width={500}
              height={500}
              style={{ objectFit: "cover" }}
            />
          </div>
          <Title>{motivator.title}</Title>
          <SubTitle>{motivator.subTitle}</SubTitle>
        </Card>
      ))}
    </Container>
  );
};

export default MotivatorCards;
