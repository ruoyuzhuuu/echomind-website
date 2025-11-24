#!/usr/bin/env python3
"""
Generate podcast cover images using OpenAI DALL-E 3
"""

import os
import sys
import json
import requests
from pathlib import Path
from openai import OpenAI

def generate_cover_image(
    episode_id: str,
    title_cn: str,
    title_en: str,
    summary: str,
    output_dir: str = "../public/images",
    style: str = "minimalist"
) -> str:
    """
    Generate a podcast cover image using DALL-E 3

    Args:
        episode_id: Episode identifier (e.g., "huberman-immune-system")
        title_cn: Chinese title
        title_en: English title
        summary: Episode summary
        output_dir: Directory to save the image
        style: Visual style (minimalist, professional, modern)

    Returns:
        Path to the generated image relative to /public
    """

    # Initialize OpenAI client
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise ValueError("OPENAI_API_KEY environment variable not set")

    client = OpenAI(api_key=api_key)

    # Create prompt for DALL-E 3
    prompt = f"""Create a professional podcast cover image with these specifications:

Title (Chinese): {title_cn}
Title (English): {title_en}
Theme: {summary[:200]}

Design requirements:
- Style: {style}, clean, professional
- Color scheme: Blue to purple gradient background (matching brand colors)
- Layout: 1:1 square ratio (1024x1024)
- Include abstract brain/neural network elements
- Modern, tech-forward aesthetic
- No text on the image (text will be added separately)
- Suitable for podcast/audio content
- High contrast for visibility in small sizes

The image should evoke scientific curiosity and modern technology."""

    print(f"\n🎨 Generating cover image for: {title_cn}")
    print(f"📝 Prompt: {prompt[:150]}...")

    try:
        # Generate image with DALL-E 3
        response = client.images.generate(
            model="dall-e-3",
            prompt=prompt,
            size="1024x1024",
            quality="standard",  # Use "hd" for higher quality (2x cost)
            n=1,
        )

        image_url = response.data[0].url
        print(f"✅ Image generated: {image_url}")

        # Download the image
        image_response = requests.get(image_url)
        image_response.raise_for_status()

        # Save to output directory
        output_path = Path(__file__).parent / output_dir
        output_path.mkdir(parents=True, exist_ok=True)

        image_filename = f"{episode_id}.jpg"
        image_filepath = output_path / image_filename

        with open(image_filepath, "wb") as f:
            f.write(image_response.content)

        print(f"💾 Image saved to: {image_filepath}")

        # Return relative path for use in JSON
        relative_path = f"/images/{image_filename}"
        return relative_path

    except Exception as e:
        print(f"❌ Error generating image: {e}")
        raise


def update_episode_data(episode_json_path: str, cover_image_path: str):
    """
    Update episode JSON with the generated cover image path

    Args:
        episode_json_path: Path to the episode JSON file
        cover_image_path: Relative path to the cover image
    """
    with open(episode_json_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    data["coverImage"] = cover_image_path

    with open(episode_json_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"✅ Updated {episode_json_path} with coverImage: {cover_image_path}")


def main():
    """Main function to generate cover from episode JSON"""

    if len(sys.argv) < 2:
        print("Usage: python3 generate_cover.py <episode_json_path>")
        print("Example: python3 generate_cover.py ../data/episodes/huberman-immune-system.json")
        sys.exit(1)

    episode_json_path = sys.argv[1]

    # Load episode data
    with open(episode_json_path, "r", encoding="utf-8") as f:
        episode = json.load(f)

    episode_id = episode["id"]
    title_cn = episode["titleCn"]
    title_en = episode["titleEn"]
    summary = episode["summary"]["zh"]

    # Generate cover image
    cover_path = generate_cover_image(
        episode_id=episode_id,
        title_cn=title_cn,
        title_en=title_en,
        summary=summary,
    )

    # Update episode JSON
    update_episode_data(episode_json_path, cover_path)

    print(f"\n🎉 Cover generation complete!")
    print(f"   Image: {cover_path}")
    print(f"   Updated: {episode_json_path}")


if __name__ == "__main__":
    main()
