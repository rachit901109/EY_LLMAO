import pandas as pd
import numpy as np
from sentence_transformers import SentenceTransformer
from sklearn.decomposition import PCA
from sklearn.metrics.pairwise import cosine_similarity


def recommend_module(module_id):
    df_module = pd.read_csv("modules.csv")
    X = np.array(df_module.summary)

    model = SentenceTransformer('all-distilroberta-v1')
    vec_embed = model.encode(X)

    pca = PCA(n_components=10)
    lower_embed = pca.fit_transform(vec_embed)

    cosine_sim_mat = cosine_similarity(lower_embed)
    cosine_sim_data = pd.DataFrame(cosine_sim_mat)

    module_id -= 1
    similar_module_id = cosine_sim_data.loc[module_id].sort_values(ascending=False).index.tolist()[1:6]
    rec_module_ids = df_module['module_id'].loc[similar_module_id].values.tolist()
    return rec_module_ids


def popular_topics():
    df_query = pd.read_csv('queries.csv')
    most_queried_topics = df_query['topic_id'].value_counts().index.tolist()[:5]
    return most_queried_topics