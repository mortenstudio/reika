import { groq } from "next-sanity";

export const homePageQuery = groq`
  *[_type == "home" && _id == "home"][0] {
    _id,
    _type,
    _rev,
    title,
    seoTitle,
    seoDescription,
    seoImage {
      asset-> {
        _id,
        url
      }
    },
    introduction,
    hero {
      ...,
      video {
        asset-> {
          _id,
          _type,
          url
        }
      }
    },
    contentBlocks[] {
      _type,
      _key,
      ...,
      models[]-> {
        _id,
        _type,
        name,
        slug,
        description,
        size,
        sizeBya,
        capacity,
        rooms,
        floors,
        images[] {
          asset-> {
            _id,
            _type,
            url
          }
        },
        types[] {
          _key,
          name,
          image {
            asset-> {
              _id,
              _type,
              url
            }
          },
          description
        }
      },
      phases[] {
        title,
        description,
        duration,
        features,
        image {
          asset-> {
            _id,
            _type,
            url
          }
        }
      },
      items[] {
        title,
        content
      },
      socialLinks[] {
        platform,
        url
      }
    }
  }
`;

// Note: This query is for a potential "pages" singleton document
// If you're using individual "page" documents, use a different query
export const pagesQuery = groq`
  *[_type == "page"] | order(_createdAt desc) {
    _id,
    _type,
    _rev,
    name,
    slug,
    description,
    image {
      asset-> {
        _id,
        _type,
        url
      }
    }
  }
`;

export const settingsQuery = groq`
  *[_type == "settings" && _id == "settings"][0] {
    _id,
    _type,
    _rev,
    siteName,
    siteDescription,
    tagline,
    subtagline,
    contactFormEmail,
    seoTitle,
    seoDescription,
    seoImage {
      asset-> {
        _id,
        url
      }
    },
    navigation[]-> {
      _id,
      _type,
      "name": select(_type == "home" => coalesce(name, seoTitle, "Hjem"), name),
      "slug": select(_type == "home" => {"_type": "slug", "current": "home"}, slug),
    },
    footer {
      contactText,
      contactEmail,
      contactEmailUrl,
      findUsText,
      address,
      addressUrl,
      followUsText,
      socialLinks[] {
        platform,
        url
      }
    }
  }
`;

export const contactFormEmailQuery = groq`
  *[_type == "settings" && _id == "settings"][0] {
    contactFormEmail
  }
`;

export const modelsQuery = groq`
  *[_type == "model"] | order(_createdAt asc) {
    _id,
    _type,
    _rev,
    name,
    slug,
    description,
    size,
    capacity,
    price,
    sizeBya,
    sizeBra,
    rooms,
    floors,
    bedrooms,
    bathrooms,
    weight,
    ceilingHeight,
    modules,
    images[] {
      asset-> {
        _id,
        _type,
        url
      }
    }
  }
`;

export const modelSlugsQuery = groq`
  *[_type == "model" && defined(slug.current) && slug.current != ""].slug.current
`;

export const modelBySlugQuery = groq`
  *[_type == "model" && slug.current == $slug][0] {
    _id,
    _type,
    _rev,
    name,
    slug,
    description,
    seoTitle,
    seoDescription,
    seoImage {
      asset-> {
        _id,
        url
      }
    },
    size,
    capacity,
    price,
    sizeBya,
    sizeBra,
    rooms,
    floors,
    bedrooms,
    bathrooms,
    weight,
    ceilingHeight,
    modules,
    images[] {
      asset-> {
        _id,
        _type,
        url
      }
    },
    contentBlocks[] {
      _type,
      _key,
      ...,
      image {
        asset-> {
          _id,
          _type,
          url
        }
      },
      floorPlans[] {
        alt,
        caption,
        image {
          asset-> {
            _id,
            _type,
            url
          }
        }
      },
      slides[] {
        title,
        description,
        image {
          asset-> {
            _id,
            _type,
            url
          }
        }
      },
      cards[] {
        title,
        description,
        image {
          asset-> {
            _id,
            _type,
            url
          }
        }
      }
    },
    types[] {
      _key,
      name,
      image {
        asset-> {
          _id,
          _type,
          url
        }
      },
      description
    }
  }
`;

export const pageSlugsQuery = groq`
  *[_type == "page" && defined(slug.current) && slug.current != ""].slug.current
`;

export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    _type,
    _rev,
    name,
    slug,
    description,
    introduction,
    seoTitle,
    seoDescription,
    seoImage {
      asset-> {
        _id,
        url
      }
    },
    image {
      asset-> {
        _id,
        _type,
        url
      }
    },
    contentBlocks[] {
      _type,
      _key,
      ...,
      images[] {
        alt,
        caption,
        image {
          asset-> {
            _id,
            _type,
            url
          }
        }
      },
      slides[] {
        title,
        description,
        image {
          asset-> {
            _id,
            _type,
            url
          }
        }
      },
      models[]-> {
        _id,
        _type,
        name,
        slug,
        description,
        size,
        sizeBya,
        capacity,
        rooms,
        floors,
        images[] {
          asset-> {
            _id,
            _type,
            url
          }
        },
        types[] {
          _key,
          name,
          image {
            asset-> {
              _id,
              _type,
              url
            }
          },
          description
        }
      },
      steps[] {
        title,
        description,
        image {
          asset-> {
            _id,
            _type,
            url
          }
        }
      },
      cards[] {
        title,
        description,
        image {
          asset-> {
            _id,
            _type,
            url
          }
        }
      },
      items[] {
        title,
        content
      }
    }
  }
`;
