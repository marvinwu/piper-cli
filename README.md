



sample input care_single.json
```json
[
  {
    "title": "Senecio serpens",
    "cares": [
      {
        "title": "cuttings",
        "content": "To grow Chalksticks from cuttings, use a sterile, sharp knife or pair of scissors. Remove a leaf from the main plant, and allow it to callous for several days before placing on well-draining soil. Water whenever the soil has dried out completely."
      },
      {
        "title": "dormancy",
        "content": "Chalksticks grow more actively during warmer months. If your succulents are planted in containers and do not live in a warmer zone, bring them inside until the weather warms up again."
      },
      {
        "title": "fertilizing",
        "content": "You can fertilize “Chalksticks” once a year, but if you are growing them indoors, be sure they are getting plenty of sunlight. Too little and the plant can stretch."
      },
      {
        "title": "general care",
        "content": "Blue Chalksticks are perfect for container gardens, or use as a ground cover. Expect small white flowers in the summer months.. They should be planted in well-draining soil, and watered only when the soil is completely dry. They are also deer and rabbit resistant."
      },
      {
        "title": "helpful information",
        "content": "If you are creating a fire-resistant landscape, Senecio serpens is a great succulent to consider."
      },
      {
        "title": "how to propagate",
        "content": "Blue Chalksticks can be propagated by cuttings or seeds."
      },
      {
        "title": "seed",
        "content": "When growing Senecio serpens from seed, be sure that the temperature is warmer, or you are using a grow light and seed warmer. Sow seeds in well-draining soil, watering whenever the soil is dry. Germination can take several weeks or longer, depending on your growing environment."
      }
    ]
  }
]
```


## flatten
flatten collection

```
cat fixture/care_single.json | node cli.js flatten
```

```
[
  {
    "title": "Senecio serpens",
    "cares_0_title": "cuttings",
    "cares_0_content": "To grow Chalksticks from cuttings, use a sterile, sharp knife or pair of scissors. Remove a leaf from the main plant, and allow it to callous for several days before placing on well-draining soil. Water whenever the soil has dried out completely.",
    "cares_1_title": "dormancy",
    "cares_1_content": "Chalksticks grow more actively during warmer months. If your succulents are planted in containers and do not live in a warmer zone, bring them inside until the weather warms up again.",
    "cares_2_title": "fertilizing",
    "cares_2_content": "You can fertilize “Chalksticks” once a year, but if you are growing them indoors, be sure they are getting plenty of sunlight. Too little and the plant can stretch.",
    "cares_3_title": "general care",
    "cares_3_content": "Blue Chalksticks are perfect for container gardens, or use as a ground cover. Expect small white flowers in the summer months.. They should be planted in well-draining soil, and watered only when the soil is completely dry. They are also deer and rabbit resistant.",
    "cares_4_title": "helpful information",
    "cares_4_content": "If you are creating a fire-resistant landscape, Senecio serpens is a great succulent to consider.",
    "cares_5_title": "how to propagate",
    "cares_5_content": "Blue Chalksticks can be propagated by cuttings or seeds.",
    "cares_6_title": "seed",
    "cares_6_content": "When growing Senecio serpens from seed, be sure that the temperature is warmer, or you are using a grow light and seed warmer. Sow seeds in well-draining soil, watering whenever the soil is dry. Germination can take several weeks or longer, depending on your growing environment."
  }
]
```




## keyBy a collection


```bash
cat fixture/care_single.json | node cli.js keyBy title -p cares -rm
```

output

```json
[
  {
    "title": "Senecio serpens",
    "cuttings": {
      "title": "cuttings",
      "content": "To grow Chalksticks from cuttings, use a sterile, sharp knife or pair of scissors. Remove a leaf from the main plant, and allow it to callous for several days before placing on well-draining soil. Water whenever the soil has dried out completely."
    },
    "dormancy": {
      "title": "dormancy",
      "content": "Chalksticks grow more actively during warmer months. If your succulents are planted in containers and do not live in a warmer zone, bring them inside until the weather warms up again."
    },
    "fertilizing": {
      "title": "fertilizing",
      "content": "You can fertilize “Chalksticks” once a year, but if you are growing them indoors, be sure they are getting plenty of sunlight. Too little and the plant can stretch."
    },
    "general care": {
      "title": "general care",
      "content": "Blue Chalksticks are perfect for container gardens, or use as a ground cover. Expect small white flowers in the summer months.. They should be planted in well-draining soil, and watered only when the soil is completely dry. They are also deer and rabbit resistant."
    },
    "helpful information": {
      "title": "helpful information",
      "content": "If you are creating a fire-resistant landscape, Senecio serpens is a great succulent to consider."
    },
    "how to propagate": {
      "title": "how to propagate",
      "content": "Blue Chalksticks can be propagated by cuttings or seeds."
    },
    "seed": {
      "title": "seed",
      "content": "When growing Senecio serpens from seed, be sure that the temperature is warmer, or you are using a grow light and seed warmer. Sow seeds in well-draining soil, watering whenever the soil is dry. Germination can take several weeks or longer, depending on your growing environment."
    }
  }
]
```

