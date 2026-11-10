--
-- PostgreSQL database dump
--

\restrict 3wH2jzLfZR7aZOVfqnrhq9IVTfcRYacjECCQcWM7YX26RdL3TfweeSbKTTtvacO

-- Dumped from database version 18.6 (Debian 18.6-1.pgdg13+2)
-- Dumped by pg_dump version 18.6 (Debian 18.6-1.pgdg13+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: tb_account; Type: TABLE; Schema: public; Owner: api
--

CREATE TABLE public.tb_account (
    id uuid NOT NULL,
    email character varying(255),
    nickname character varying(255),
    password character varying(255)
);


ALTER TABLE public.tb_account OWNER TO api;

--
-- Name: tb_anime_lists; Type: TABLE; Schema: public; Owner: api
--

CREATE TABLE public.tb_anime_lists (
    list_id uuid NOT NULL,
    anime_id uuid NOT NULL
);


ALTER TABLE public.tb_anime_lists OWNER TO api;

--
-- Name: tb_animes; Type: TABLE; Schema: public; Owner: api
--

CREATE TABLE public.tb_animes (
    id uuid NOT NULL,
    episode integer,
    favorite boolean,
    finished boolean,
    need_to_watch boolean,
    release_day smallint,
    season integer,
    title character varying(255),
    waiting_for_next_season boolean,
    watched boolean,
    CONSTRAINT tb_animes_release_day_check CHECK (((release_day >= 0) AND (release_day <= 6)))
);


ALTER TABLE public.tb_animes OWNER TO api;

--
-- Name: tb_lists; Type: TABLE; Schema: public; Owner: api
--

CREATE TABLE public.tb_lists (
    id uuid NOT NULL,
    name character varying(255),
    owner_id uuid
);


ALTER TABLE public.tb_lists OWNER TO api;

--
-- Data for Name: tb_account; Type: TABLE DATA; Schema: public; Owner: api
--

COPY public.tb_account (id, email, nickname, password) FROM stdin;
5ad7f133-0bd2-4caa-9bdc-decaa5536014	machadosantosrenan@gmail.com	renan	$2a$10$paYkKvEAagYeb4kT1R4fbegAkzIXNUJiNmNxomXDrkLfnDlqj.m1u
64567ff5-cf2b-4156-a6bf-66f64f9d89e9	teste@gmail.com	teste	$2a$10$xzrFj6MPDR.4e/3clJkLQ.XnvZ6hRU1uEhvmiYATxBtIdVTEa1Z/q
\.


--
-- Data for Name: tb_anime_lists; Type: TABLE DATA; Schema: public; Owner: api
--

COPY public.tb_anime_lists (list_id, anime_id) FROM stdin;
cd2c450c-3cfc-424b-a564-4a8409ff60db	27ccad56-3cc2-4935-a152-51fd506f840e
cd2c450c-3cfc-424b-a564-4a8409ff60db	c3f5ab75-645f-4308-9364-6d289f31b2e8
cd2c450c-3cfc-424b-a564-4a8409ff60db	545a77d4-b0df-4bd2-9f6c-00d84665e241
cd2c450c-3cfc-424b-a564-4a8409ff60db	8a0cde30-8772-44e6-9c2d-52feb0af0e2a
cd2c450c-3cfc-424b-a564-4a8409ff60db	ba53a216-ed5e-41ba-9614-c06d99077e2c
cd2c450c-3cfc-424b-a564-4a8409ff60db	ffd697c2-51a9-4b59-9b14-780c17420b1d
cd2c450c-3cfc-424b-a564-4a8409ff60db	7d0e978b-8974-44d7-a410-682c1938897c
cd2c450c-3cfc-424b-a564-4a8409ff60db	3c3325c3-0d9c-44bf-aab6-1fd3879e199e
cd2c450c-3cfc-424b-a564-4a8409ff60db	c86a0058-9900-44d4-a949-edef9227063f
cd2c450c-3cfc-424b-a564-4a8409ff60db	5d132837-8a92-438a-85e9-0d9c1e33bc41
cd2c450c-3cfc-424b-a564-4a8409ff60db	2c10f117-775c-4c71-93a6-f3b72a5f2841
cd2c450c-3cfc-424b-a564-4a8409ff60db	37b46ce7-3ce0-4902-aaa4-5636080c0b61
cd2c450c-3cfc-424b-a564-4a8409ff60db	94d6b930-e921-44fb-9b1b-acefa5819ce6
cd2c450c-3cfc-424b-a564-4a8409ff60db	c6f7f15a-eb09-4eac-b1c1-9b0378432b44
cd2c450c-3cfc-424b-a564-4a8409ff60db	5f2d419e-7cd3-44a2-9a5a-b3d0fd024c3d
cd2c450c-3cfc-424b-a564-4a8409ff60db	6447555a-a743-47d9-81ee-975f6ec9f18a
cd2c450c-3cfc-424b-a564-4a8409ff60db	444c8065-b0fb-41ef-b037-042628076e9c
cd2c450c-3cfc-424b-a564-4a8409ff60db	e29ac3ba-a77e-444d-95e7-b57a0af3a3c3
cd2c450c-3cfc-424b-a564-4a8409ff60db	4e524104-0e00-4576-b4f0-84111c71076d
cd2c450c-3cfc-424b-a564-4a8409ff60db	9e392c89-9866-46ef-b3e3-4dcb9d07cc5c
cd2c450c-3cfc-424b-a564-4a8409ff60db	4f7d3bd7-4ff5-4f75-bb5d-fcc583120dc2
cd2c450c-3cfc-424b-a564-4a8409ff60db	66544ccf-ce4a-4cfa-8e9f-0836fc7ae2b7
cd2c450c-3cfc-424b-a564-4a8409ff60db	3fb419d6-fb41-479f-b12b-73bc8bb82f51
cd2c450c-3cfc-424b-a564-4a8409ff60db	b66f3568-be18-4c8a-a622-05f9c99a8a3c
cd2c450c-3cfc-424b-a564-4a8409ff60db	bdd5eaa8-495e-43c2-adef-694ec5993399
cd2c450c-3cfc-424b-a564-4a8409ff60db	2388c7d7-0309-491d-b744-09095170d0b1
cd2c450c-3cfc-424b-a564-4a8409ff60db	1bac1b15-c009-4928-9018-0f35970a77c5
cd2c450c-3cfc-424b-a564-4a8409ff60db	6745391f-3637-45d6-b8da-910055e53ec9
cd2c450c-3cfc-424b-a564-4a8409ff60db	7c644560-7650-42b7-a972-e919a55ddca4
cd2c450c-3cfc-424b-a564-4a8409ff60db	1775a2f2-0976-4c12-92be-60850e9c43ab
cd2c450c-3cfc-424b-a564-4a8409ff60db	95bc09ba-98eb-41da-be47-b956d8f0434c
cd2c450c-3cfc-424b-a564-4a8409ff60db	ff01859d-f472-45e7-8e11-8e517ea77445
cd2c450c-3cfc-424b-a564-4a8409ff60db	2c6f260e-3387-4ffa-bf02-02c135646e48
cd2c450c-3cfc-424b-a564-4a8409ff60db	c6813079-59bf-4733-a977-a0ee3586f95a
cd2c450c-3cfc-424b-a564-4a8409ff60db	fe3b3d0f-e8b5-4ddf-ad51-256a16f2cf4b
cd2c450c-3cfc-424b-a564-4a8409ff60db	d97ded57-3606-4344-b8d4-d8ff254a9db9
cd2c450c-3cfc-424b-a564-4a8409ff60db	cae77141-a8c3-49e1-8d78-fafe769ae803
cd2c450c-3cfc-424b-a564-4a8409ff60db	167f3acf-1fe2-4491-a772-07c58dad0ade
cd2c450c-3cfc-424b-a564-4a8409ff60db	c2c516c0-b372-4ada-9a8f-7bf286c02a4b
\.


--
-- Data for Name: tb_animes; Type: TABLE DATA; Schema: public; Owner: api
--

COPY public.tb_animes (id, episode, favorite, finished, need_to_watch, release_day, season, title, waiting_for_next_season, watched) FROM stdin;
27ccad56-3cc2-4935-a152-51fd506f840e	30	t	t	f	6	10	Naruto Shipuden	f	t
c3f5ab75-645f-4308-9364-6d289f31b2e8	12	t	f	f	6	1	Saikyou no Shienshoku	t	t
545a77d4-b0df-4bd2-9f6c-00d84665e241	1	t	f	t	6	1	Tenkou-saki	f	f
28e79296-d5a7-4c80-b74f-cad6a72f56a3	1	f	f	t	6	1	Gachiakuta	t	f
8421d7e4-f96a-41c1-94ec-706b128cb04f	1	f	f	t	6	1	Majutsushi Kunon	t	f
ba53a216-ed5e-41ba-9614-c06d99077e2c	1	t	f	t	6	1	Yuusha-kei ni Shoshu	t	f
ffd697c2-51a9-4b59-9b14-780c17420b1d	1	t	f	t	6	1	Yuusha Party wo Oidasareta	t	f
7d0e978b-8974-44d7-a410-682c1938897c	12	t	f	f	6	3	Jujutsu Kaisen	t	t
3c3325c3-0d9c-44bf-aab6-1fd3879e199e	12	t	f	f	6	2	Jigokuraku	t	t
c86a0058-9900-44d4-a949-edef9227063f	12	t	f	f	6	3	Oshi no Ko	t	t
5d132837-8a92-438a-85e9-0d9c1e33bc41	1	t	f	t	6	2	Sousou no Frieren	t	f
6c63496d-c61b-4c9b-a621-71242ba1b3fd	1	f	f	t	6	1	Dark Moon	t	f
f1b55068-a19b-4e2b-b100-eb9588353b0b	1	f	f	t	6	1	Eris no Seihai	t	f
566beea5-cdd7-4f3a-87c8-24998560bd34	1	f	f	t	6	1	Hazure Skill	t	f
2c10f117-775c-4c71-93a6-f3b72a5f2841	12	t	f	f	6	1	Tongari Boushi	t	t
37b46ce7-3ce0-4902-aaa4-5636080c0b61	12	t	f	f	6	2	Tsue no Tsurugi	t	t
036ee2cf-3ca0-4262-aa8a-1e4b602bf04f	1	f	f	t	6	1	Kuroneko no Majo	t	f
ba6d8464-9c24-4689-84f6-185609f19249	1	f	f	t	6	1	Magic Maker	t	f
ec9a2945-a93d-4575-be4f-a3a6222e50cc	1	f	f	t	6	1	Isekai no Cheat Skill	t	t
94d6b930-e921-44fb-9b1b-acefa5819ce6	1	t	f	t	6	1	Vanitas no Carte	t	t
c6f7f15a-eb09-4eac-b1c1-9b0378432b44	24	t	t	f	6	1	Darling in the Franxx	f	t
e47ba40e-77dd-4a3f-b9e4-0047b87180d7	1	f	f	t	6	2	Isekai nonbiri nouka	t	f
094b38bd-5579-44ba-8187-9ef1264000eb	1	f	f	t	6	2	Katainaka no ossan	t	f
5f2d419e-7cd3-44a2-9a5a-b3d0fd024c3d	10	t	t	f	6	1	Cyberpunk Edgerunners	f	t
6447555a-a743-47d9-81ee-975f6ec9f18a	13	t	f	f	6	1	Koukyuu no Karasu	t	t
e29ac3ba-a77e-444d-95e7-b57a0af3a3c3	12	t	f	f	6	1	Nigashita Sakana	t	t
88171671-3dd8-43ae-9568-3049c156ccaa	1	f	f	t	6	1	Grow Up Show	f	f
4e524104-0e00-4576-b4f0-84111c71076d	12	t	t	f	6	1	Kanpekisugite Kawage	f	t
9e392c89-9866-46ef-b3e3-4dcb9d07cc5c	12	t	t	t	6	1	Zutaboro Reijou	f	t
c01c026a-270b-457a-a8b2-a7771d62fe54	12	f	t	f	6	1	Watashi no Shiawase	f	t
4f7d3bd7-4ff5-4f75-bb5d-fcc583120dc2	16	t	f	f	6	4	Classroom of the Elite	t	t
b66f3568-be18-4c8a-a622-05f9c99a8a3c	1	t	f	t	1	1	Sekai Saikou no Ansatsusha	t	t
2388c7d7-0309-491d-b744-09095170d0b1	12	t	t	f	5	1	Oni no Hanayome	f	t
8a0cde30-8772-44e6-9c2d-52feb0af0e2a	1	t	f	f	6	1	Chitose-kun wa	f	f
3fb419d6-fb41-479f-b12b-73bc8bb82f51	1	t	t	t	6	1	Toumei na Yoru	f	f
6745391f-3637-45d6-b8da-910055e53ec9	24	t	f	f	6	3	Tensei shitara slime	t	t
7c644560-7650-42b7-a972-e919a55ddca4	19	t	f	f	6	4	Re:zero	t	t
167f3acf-1fe2-4491-a772-07c58dad0ade	4	t	f	f	6	1	Kyouran Reijou Nia Linston	f	f
bdd5eaa8-495e-43c2-adef-694ec5993399	11	t	t	f	6	1	Futsutsuka	f	t
1bac1b15-c009-4928-9018-0f35970a77c5	14	t	f	f	6	3	Mushoku Tensei	t	t
66544ccf-ce4a-4cfa-8e9f-0836fc7ae2b7	12	t	f	f	2	2	Otomo game sekai	t	t
9108fd43-4dd1-41a5-b112-ad1567284cc2	12	f	t	f	2	1	Mujikaku Seijo	f	t
cbd7a7ef-765d-4c6b-b390-51d2b75d5be6	12	f	t	f	6	1	Buchigire Reijou	f	t
eaa003ba-a922-418d-854d-6180bd31363c	12	f	t	f	6	1	Kimi wo Aisuru	f	t
c2c516c0-b372-4ada-9a8f-7bf286c02a4b	1	t	f	f	3	2	Iceblade Sorcerer	f	f
444c8065-b0fb-41ef-b037-042628076e9c	1	t	f	t	6	2	Gaikotsu	f	t
fe3b3d0f-e8b5-4ddf-ad51-256a16f2cf4b	2	t	f	f	5	1	Romeria Senki	f	f
2c6f260e-3387-4ffa-bf02-02c135646e48	3	t	f	f	6	3	Tensei Kizoku	f	f
adb9d9f9-f133-4296-afc7-4a8219fa1116	2	f	f	f	0	1	Doumo, suki na hito	f	f
cae77141-a8c3-49e1-8d78-fafe769ae803	2	t	f	f	6	1	Shiotaiou no Satou-san	f	f
1775a2f2-0976-4c12-92be-60850e9c43ab	18	t	f	f	3	1	Tsuihou Sareta Tensei	f	f
ff01859d-f472-45e7-8e11-8e517ea77445	5	t	f	f	6	2	Black Clover	f	f
d907ea57-1637-426b-bfdf-adee41472400	4	f	f	f	6	1	Shinja Zero no Megami	f	f
c6813079-59bf-4733-a977-a0ee3586f95a	5	t	f	f	6	1	Yowaki MAX Reijou	f	f
d97ded57-3606-4344-b8d4-d8ff254a9db9	6	t	f	f	6	1	Magical Explorer	f	f
95bc09ba-98eb-41da-be47-b956d8f0434c	6	t	f	f	6	3	Apothecary Diares	f	f
69af4671-6faa-416a-a246-954a99581334	5	f	f	f	6	1	Certain Dark Item	f	f
\.


--
-- Data for Name: tb_lists; Type: TABLE DATA; Schema: public; Owner: api
--

COPY public.tb_lists (id, name, owner_id) FROM stdin;
cd2c450c-3cfc-424b-a564-4a8409ff60db	Favoritos	5ad7f133-0bd2-4caa-9bdc-decaa5536014
7ea1e08a-2c3a-4656-b2b4-6f0e300460e8	Favoritos	64567ff5-cf2b-4156-a6bf-66f64f9d89e9
\.


--
-- Name: tb_account tb_account_pkey; Type: CONSTRAINT; Schema: public; Owner: api
--

ALTER TABLE ONLY public.tb_account
    ADD CONSTRAINT tb_account_pkey PRIMARY KEY (id);


--
-- Name: tb_animes tb_animes_pkey; Type: CONSTRAINT; Schema: public; Owner: api
--

ALTER TABLE ONLY public.tb_animes
    ADD CONSTRAINT tb_animes_pkey PRIMARY KEY (id);


--
-- Name: tb_lists tb_lists_pkey; Type: CONSTRAINT; Schema: public; Owner: api
--

ALTER TABLE ONLY public.tb_lists
    ADD CONSTRAINT tb_lists_pkey PRIMARY KEY (id);


--
-- Name: idx_account_email; Type: INDEX; Schema: public; Owner: api
--

CREATE INDEX idx_account_email ON public.tb_account USING btree (email);


--
-- Name: idx_account_nickname; Type: INDEX; Schema: public; Owner: api
--

CREATE INDEX idx_account_nickname ON public.tb_account USING btree (nickname);


--
-- Name: idx_anime_title; Type: INDEX; Schema: public; Owner: api
--

CREATE INDEX idx_anime_title ON public.tb_animes USING btree (title);


--
-- Name: idx_list_name; Type: INDEX; Schema: public; Owner: api
--

CREATE INDEX idx_list_name ON public.tb_lists USING btree (name);


--
-- Name: idx_list_owner; Type: INDEX; Schema: public; Owner: api
--

CREATE INDEX idx_list_owner ON public.tb_lists USING btree (owner_id);


--
-- Name: tb_lists fkacmoq9cvu28avj5ul1nq5e1kf; Type: FK CONSTRAINT; Schema: public; Owner: api
--

ALTER TABLE ONLY public.tb_lists
    ADD CONSTRAINT fkacmoq9cvu28avj5ul1nq5e1kf FOREIGN KEY (owner_id) REFERENCES public.tb_account(id);


--
-- Name: tb_anime_lists fko3wly5k075ilopb6w2t22h8ld; Type: FK CONSTRAINT; Schema: public; Owner: api
--

ALTER TABLE ONLY public.tb_anime_lists
    ADD CONSTRAINT fko3wly5k075ilopb6w2t22h8ld FOREIGN KEY (list_id) REFERENCES public.tb_lists(id);


--
-- Name: tb_anime_lists fktfy62cxq29nojt663o0ye04q8; Type: FK CONSTRAINT; Schema: public; Owner: api
--

ALTER TABLE ONLY public.tb_anime_lists
    ADD CONSTRAINT fktfy62cxq29nojt663o0ye04q8 FOREIGN KEY (anime_id) REFERENCES public.tb_animes(id);


--
-- PostgreSQL database dump complete
--

\unrestrict 3wH2jzLfZR7aZOVfqnrhq9IVTfcRYacjECCQcWM7YX26RdL3TfweeSbKTTtvacO

