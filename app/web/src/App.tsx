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
    if (!data) return;
    
    if (name === "") {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter((datum) => 
        datum.name.toLowerCase().includes(name.toLowerCase())
      ));
    }
  };

  const handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameInputValue(e.target.value);
    filterByName(e.target.value);
  };

  const clearSearch = () => {
    setNameInputValue("");
    filterByName("");
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
    <div className="app-container">
      <header className="app-header">
        <h1>Monto管理システム</h1>
      </header>
      
      <main className="app-main">
        {/* 検索セクション */}
        <section className="search-section">
          <h2>検索</h2>
          <div className="search-container">
            <div className="search-input-wrapper">
              <input
                type="text"
                placeholder="名前で検索（例: 田中）"
                value={nameInputValue}
                onChange={handleNameInputChange}
                className="search-input"
              />
              {nameInputValue && (
                <button type="button" onClick={clearSearch} className="search-clear">
                  ✕
                </button>
              )}
            </div>
            
            <div className="search-status">
              {nameInputValue ? (
                <span>「{nameInputValue}」の検索結果: {filteredData.length}件</span>
              ) : (
                <span>全{data?.length}件を表示中</span>
              )}
            </div>
          </div>
        </section>

        {/* 登録セクション */}
        <section className="register-section">
          <h2>新規登録</h2>
          <form className="register-form" action={register}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                名前 <span className="required">*</span>
              </label>
              <input 
                id="name"
                name="name" 
                className="form-input"
                placeholder="例: 田中太郎"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="address1" className="form-label">
                住所URL1
              </label>
              <input 
                id="address1"
                name="address_url_1" 
                className="form-input"
                type="url"
                placeholder="https://example.com"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="address2" className="form-label">
                住所URL2
              </label>
              <input 
                id="address2"
                name="address_url_2" 
                className="form-input"
                type="url"
                placeholder="https://example.com"
              />
            </div>
            
            <button type="submit" className="submit-button">
              登録する
            </button>
          </form>
        </section>

        {/* 一覧セクション */}
        <section className="list-section">
          <h2>一覧</h2>
          <div className="monto-list">
            {filteredData.length === 0 && nameInputValue ? (
              <div className="empty-state">
                <p>「{nameInputValue}」に一致する結果が見つかりませんでした</p>
              </div>
            ) : (
              filteredData.map((datum, index) => (
                <div key={index} className="monto-card">
                  <div className="monto-header">
                    <h3 className="monto-name">{datum.name}</h3>
                    <span className="monto-id">#{index + 1}</span>
                  </div>
                  
                  <div className="monto-addresses">
                    <h4>住所一覧</h4>
                    {datum.addresses.length === 0 ? (
                      <p className="no-addresses">住所が登録されていません</p>
                    ) : (
                      datum.addresses.map((address, i) => (
                        <div key={i} className="address-item">
                          <span className="address-label">URL{i + 1}:</span>
                          <a href={address.url} className="address-link" target="_blank" rel="noopener noreferrer">
                            {address.url}
                          </a>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
