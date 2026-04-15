const OpenAI = require('openai');

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
});

const AI_PROMPTS = {
  'product-generator': (input) => `
You are an expert product description writer.
Generate compelling, conversion-optimized product descriptions.

Input: ${input}

Generate:
1. A catchy product title
2. A compelling headline (max 10 words)
3. A detailed product description (150-200 words)
4. 5 key features/benefits (bullet points)
5. A call-to-action
6. Target audience description
7. Unique selling proposition (USP)

Format the output clearly with sections.
`,

  'seo-generator': (input) => `
You are an expert SEO content strategist and writer.
Generate SEO-optimized content for the following topic/keyword.

Input: ${input}

Generate:
1. SEO-optimized title (with primary keyword)
2. Meta description (150-160 characters)
3. URL slug suggestion
4. H1 heading
5. 3-5 H2 subheadings
6. Full SEO article (500-800 words)
7. Internal linking suggestions
8. 5 related long-tail keywords
9. Image alt text suggestions
10. Schema markup recommendation

Make it search-engine friendly and reader-friendly.
`,

  'ads-generator': (input) => `
You are an expert digital marketing copywriter.
Generate high-converting ad copy for the following product/service.

Input: ${input}

Generate:
1. Facebook Ad (primary text + headline + description)
2. Google Search Ad (3 headlines + 2 descriptions)
3. TikTok Video Script (30 seconds)
4. Instagram Ad Caption + Hashtags
5. Twitter/X Ad Copy
6. LinkedIn Ad Copy
7. 5 Viral Hooks
8. Call-to-Action variations

Make each ad compelling, benefit-driven, and action-oriented.
`,

  'business-ideas': (input) => `
You are an expert business strategist and startup advisor.
Generate innovative business ideas based on the following input/interests.

Input: ${input}

Generate 5 business ideas. For each idea provide:
1. Business name
2. One-line pitch
3. Problem it solves
4. Target market
5. Revenue model
6. Startup cost estimate (low/medium/high)
7. Time to launch estimate
8. Growth potential (1-10)
9. First 3 steps to start
10. Potential competitors

Focus on ideas with real market potential.
`,

  'social-content': (input) => `
You are an expert social media manager and content creator.
Generate engaging social media content for the following topic/brand.

Input: ${input}

Generate:
1. Instagram Caption (with hashtags)
2. Twitter/X Post (280 chars)
3. Facebook Post
4. LinkedIn Post (professional tone)
5. TikTok Video Script (60 seconds)
6. YouTube Shorts Script (60 seconds)
7. Pinterest Pin Description
8. 5 Story Ideas for Instagram/Snapchat
9. Best posting times recommendation
10. Engagement-boosting question

Make content platform-specific and engaging.
`,

  'competitor-analysis': (input) => `
You are an expert market analyst and competitive intelligence specialist.
Perform a competitive analysis for the following business/product.

Input: ${input}

Generate:
1. Top 5 competitors
2. Competitor strengths and weaknesses
3. Pricing comparison
4. Feature comparison
5. Market positioning
6. SWOT analysis
7. Opportunities in the market
8. Threats to watch for
9. Recommended differentiation strategy
10. Action items to gain competitive advantage

Be thorough and strategic.
`,
};

class AIService {
  constructor() {
    this.model = 'llama-3.3-70b-versatile';
  }

  async generate(type, input) {
    try {
      const prompt = AI_PROMPTS[type];
      if (!prompt) {
        throw new Error(`Unknown AI type: ${type}`);
      }

      const fullPrompt = prompt(input);

      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are a helpful AI assistant that generates high-quality business and marketing content.',
          },
          {
            role: 'user',
            content: fullPrompt,
          },
        ],
        model: this.model,
        temperature: 0.7,
        max_tokens: 4096,
      });

      const text = completion.choices[0].message.content;

      return {
        success: true,
        data: text,
        type,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('AI Service Error:', error);
      throw new Error(`AI generation failed: ${error.message}`);
    }
  }

  async generateMarketingCampaign(input) {
    try {
      const prompt = `
You are an expert marketing campaign manager.
Create a complete marketing campaign for: ${input}

Generate:
1. Campaign Name
2. Campaign Objective
3. Target Audience
4. Campaign Duration Recommendation
5. Channel Strategy (which platforms to use)
6. Budget Allocation Recommendation
7. 5 Email Sequence (subject + body)
8. Landing Page Copy
9. Retargeting Strategy
10. KPIs to Track
11. A/B Testing Suggestions

Make it actionable and results-oriented.
`;

      const completion = await groq.chat.completions.create({
        messages: [
          { role: 'system', content: 'You are a helpful AI assistant.' },
          { role: 'user', content: prompt },
        ],
        model: this.model,
        temperature: 0.7,
        max_tokens: 4096,
      });

      return completion.choices[0].message.content;
    } catch (error) {
      console.error('Marketing Campaign Error:', error);
      throw new Error(`Campaign generation failed: ${error.message}`);
    }
  }

  async generateTemplates() {
    try {
      const prompt = `
Generate 10 reusable marketing templates:
1. Welcome Email Template
2. Product Launch Email Template
3. Abandoned Cart Email Template
4. Newsletter Template
5. Facebook Ad Template
6. Instagram Post Template
7. Landing Page Headline Template
8. Sales Page Template
9. Webinar Invitation Template
10. Customer Testimonial Request Template

Make each template fill-in-the-blank style with placeholders.
`;

      const completion = await groq.chat.completions.create({
        messages: [
          { role: 'system', content: 'You are a helpful AI assistant.' },
          { role: 'user', content: prompt },
        ],
        model: this.model,
        temperature: 0.7,
        max_tokens: 4096,
      });

      return completion.choices[0].message.content;
    } catch (error) {
      console.error('Template Generation Error:', error);
      throw new Error(`Template generation failed: ${error.message}`);
    }
  }
}

module.exports = new AIService();
