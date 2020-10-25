import React from 'react';
import { Link } from 'react-router-dom'

type HeroPartProps = {
  title: string;
  subtitle?: string;
};

export default function HeroPart(props: HeroPartProps) {
  return (
    <section className="hero is-success mb-3">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">{props.title}</h1>
          <h2 className="subtitle">{props.subtitle || ''}</h2>
          <nav className="breadcrumb" aria-label="breadcrumbs">
            <ul>
              <li>
                <Link className="navbar-item" to="/"><span>Home</span></Link>
              </li>
              <li>
                <Link className="navbar-item" to="/Location"><span>現場</span></Link>
              </li>
              <li>
                <Link className="navbar-item" to="/FaceCheck"><span>顔認証</span></Link>
              </li>
              <li>
                <Link className="navbar-item" to="/Entry/PersonSetting">入場登録</Link>
              </li>
              <li>
                <Link className="navbar-item" to="/Leave/PersonSetting">退場登録</Link>
              </li>
              <li>
                <Link className="navbar-item" to="/FaceAdd"><span>顔登録</span></Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}