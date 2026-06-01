import "@/styles/search.css";
import Button from "./Button";
import { useState, type FormEvent } from "react";

type SearchProps = {
  onSearch: (query: string) => void;
};

export default function Search({ onSearch }: SearchProps) {
  const [searchValue, setSearchValue] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    let query = `?search=${searchValue}`;

    if (status !== null) {
      query += `&completed=${status}`;
    }

    console.log("Söker med:", query);
    onSearch(query);
  };

  return (
    <div className="search-container">
      <h2>Sök</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="search-input"
          type="text"
          placeholder="Sök..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <div className="checkboxes">
          <label className="checkbox">
            <input
              type="radio"
              name="status"
              onChange={() => setStatus("true")}
            />
            <span>Klar</span>
          </label>
          <label className="checkbox">
            <input
              type="radio"
              name="status"
              onChange={() => setStatus("false")}
            />
            <span>Ej klar</span>
          </label>
          <label className="checkbox">
            <input
              type="radio"
              name="status"
              defaultChecked
              onChange={() => setStatus(null)}
            />
            <span>Alla</span>
          </label>
        </div>
        <Button type="submit">Sök</Button>
      </form>
    </div>
  );
}
