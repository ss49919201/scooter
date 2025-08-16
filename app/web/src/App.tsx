import { useEffect, useState } from "react";
import "./App.css";
import { hc } from "hono/client";
import { type AppType } from "../worker/index";

const client = hc<AppType>("/");

function App() {
  const [data, setData] = useState<
    {
      name: string;
      addresses: {
        url: string;
      }[];
    }[]
  >();
  const [filteredData, setFilteredData] = useState<
    {
      name: string;
      addresses: {
        url: string;
      }[];
    }[]
  >();
  const [nameInputValue, setNameInputValue] = useState("");

  const filterByName = (name: string) => {
    setFilteredData(data?.filter((datum) => datum.name.includes(name)));
  };

  const handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameInputValue(e.target.value);
    filterByName(e.target.value);
  };

  useEffect(() => {
    client.montos.search.$get().then(async (res) => {
      const data = await res.json();
      setData(data);
      setFilteredData(data);
    });
  }, []);

  const register = (formData: FormData) => {
    // TODO: implement
    const name = formData.get("name");
    alert(`'${name}'`);
  };

  if (!data || !filteredData) {
    return <div>⏳loading...</div>;
  }

  return (
    <>
      <div>
        <h4>検索</h4>
        <input
          type="text"
          value={nameInputValue}
          onChange={handleNameInputChange}
        />
      </div>
      <form className="register-form" action={register}>
        <div>新規登録</div>
        <div>
          <label>名前：</label>
          <input name="name" />
        </div>
        <div>
          <label>住所URL1：</label>
          <input name="address_url_1" />
        </div>
        <div>
          <label>住所URL2：</label>
          <input name="address_url_2" />
        </div>
        <div>
          <button type="submit">送信</button>
        </div>
      </form>
      {filteredData.map((datum) => (
        <div className="card">
          <div>名前: {datum.name}</div>
          {datum.addresses.map((address, i) => (
            <div>
              住所URL{i + 1}: <a href={address.url}>{address.url}</a>
            </div>
          ))}
        </div>
      ))}
    </>
  );
}

export default App;
